const express = require('express');
const router= new express.Router()
const { createOrder, deleteOrder, getAllOrders, getOrder, getUserOrder, updateOrder } = require('../controllers/orderController') 
const isAuthenticated = require('../middleware/auth')
const {paymentProcess, paymentVerify} = require('../controllers/paymentController')

router.post('/createOrder',isAuthenticated, createOrder)
router.get('/getOrders',isAuthenticated, getAllOrders)
router.get('/getOrders/me',isAuthenticated, getUserOrder)
router.get('/getOrder/:id',isAuthenticated, getOrder)
router.post('/updateOrder/:id',isAuthenticated, updateOrder)
router.post('/deleteOrder/:id',isAuthenticated, deleteOrder)
router.post('/payment',isAuthenticated,paymentProcess)
router.post('/paymentVerify',isAuthenticated, paymentVerify)


module.exports = router