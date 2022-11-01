const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        phoneNo: {
            type: Number,
            required: true
        }
    },
    orderedItems: [{
        name: {
            type: String,
            required: true
        },

        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        }
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentInfo: {
        receipt:{
            type:String,
            required: true
        },
        payment_id: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: 'Pending'
        },
        paidAt: {
            type: Date,
            required: true
        },
    },

    taxPrice: {
        type: Number,
        // required: true,
        default: 0
    },
    shippingCharges: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    deliveryDate:{
        type: Date,
    },
    deliveredAt: {
        type: Date,
    }
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    }
})

module.exports = mongoose.model('Order', orderSchema)