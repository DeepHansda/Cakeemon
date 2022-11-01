const express = require('express');
const { createProduct, getAllProducts, getAdminProducts, getProductDetails, deleteProduct, updateProduct, createReview, deleteReview } = require('../controllers/productController');
const upload = require('../middleware/multerUpload')
const router = new express.Router();
const isAuthenticated = require('../middleware/auth')


router.post('/createProduct',isAuthenticated,upload.array('img',5),createProduct)
router.get('/getProducts',getAllProducts);
router.get('/getAllProducts',getAdminProducts)
router.get('/getProduct/:id',getProductDetails)
router.post('/deleteProduct/:id',deleteProduct)
router.post('/updateProduct/:id',updateProduct)
router.post('/createReview',isAuthenticated,createReview)
router.delete('/deleteReview',isAuthenticated,deleteReview)


module.exports = router;