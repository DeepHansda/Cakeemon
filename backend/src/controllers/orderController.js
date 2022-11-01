const Order = require('../DB/models/orderModel');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../services/errorHandler');
const ProductModel = require('../DB/models/productModel')


module.exports = {
    // create order
    createOrder: catchAsyncErrors(async (req, res, next) => {
       
        const order = new Order(req.body);
        await order.save((err, order) => {
            if (err) {
                console.log(err)
                return next(new ErrorHandler('something went wrong', 401));
            }

            res.status(200).json({
                success: 1,
                message: 'order placed successfully',
                order
            })
        });
    }),

    // get all orders
    getAllOrders: catchAsyncErrors(async (req, res, next) => {
        await Order.find({}).populate("createdBy").exec((err, orders) => {
            if (err) {
                console.log(err)
                return next(new ErrorHandler('something went wrong', 401))
            } else if (!orders || !orders.length === 0) {
                return next(new ErrorHandler('orders not found', 401))
            } else {
                let totalAmout
                orders.forEach((order) => {
                    totalAmout += order.totalPrice
                })
                res.status(200).json({
                    success: 1,
                    totalAmout,
                    orders
                })
            }
        })
    }),

    // get a order details

    getOrder: catchAsyncErrors(async (req, res, next) => {
        await Order.findOne({
            _id: req.params.id
        }).populate('createdBy').exec((err, order) => {
            if (err) {
                console.log(err)
                return next(new ErrorHandler('something went wrong', 401))
            } else if (!order) {
                return next(new ErrorHandler('order not found', 401))
            } else {
                res.status(200).json({
                    success: 1,
                    order
                })
            }
        })
    }),

    // get loggedIn user orders

    getUserOrder: catchAsyncErrors(async (req, res, next) => {
        await Order.find({
            createdBy: req.user._id
        }).exec((err, order) => {
            if (err) {
                console.log(err)
                return next(new ErrorHandler('something went wrong', 401))
            } else if (!order) {
                return next(new ErrorHandler('orders not found', 401))
            } else {
                res.status(200).json({
                    success: 1,
                    order
                })
            }
        })
    }),

    // upadate orders

    updateOrder: catchAsyncErrors(async (req, res, next) => {
        await Order.findOne({
            _id: req.params.id
        }).exec(async (err, order) => {
            if (err) {
                console.log(err)
                return next(new ErrorHandler('something went wrong', 401))
            } else if (!order) {
                return next(new ErrorHandler('orders not found', 401))
            } else {
                if (order.orderStatus === 'Delivered') {
                    return next(new ErrorHandler('this order already delivered'))
                }

                if (req.body.orderStatus === 'Shipped') {
                    order.orderedItems.forEach(async (item) => {
                        await updateOrder(item.id, item.quantity)
                    })
                }

                order.orderStatus = req.body.orderStatus

                if (req.body.orderStatus === 'Delivered') {
                    order.deliveredAt = Date.now()
                }

                await order.save({
                    validateBeforeSave: false
                }, (err, result) => {
                    if (err) {
                        console.log(err)
                        return next(new ErrorHandler('something went wrong', 401))
                    }

                    res.status(200).json({
                        success: 1,
                        message: 'order updated successfully',
                        result
                    })
                })
            }
        })

        async function updateOrder(id, quantity) {
            const product = await ProductModel.findOne({
                _id: id
            })
            product.stock -= quantity
            await product.save({
                validateBeforeSave: false
            })
        }
    }),



    // delete order  

    deleteOrder: catchAsyncErrors(async (req, res, next) => {
        await Order.findByIdAndDelete({
            _id: req.params.id
        }).exec((err, result) => {
            if (err) {
                console.log(err)
                return next(new ErrorHandler('deletation failed, something went wrong', 401))
            }

            else if (!result||result===null){
                return next(new ErrorHandler('order not found', 401))
            }
            res.status(200).json({
                success: 1,
                message: 'Order deleted successfully',
                result
            })
        })
    })
}