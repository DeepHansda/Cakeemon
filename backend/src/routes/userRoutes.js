const express = require('express');
const router = new express.Router();
const {signUp, login, getUsers, getUserById, logout, userDetails, deleteUser} = require('../controllers/userController')
const upload = require('../middleware/multerUpload')
const isAuthenticated = require('../middleware/auth')
const cors = require("cors");


router.post('/signUp',upload.single('img'),signUp);
router.post('/login',login);
router.post('/logout',logout);
router.get('/getUsers',isAuthenticated,getUsers);
router.get('/userDetails',isAuthenticated,userDetails);
router.get('/getUser/:id',isAuthenticated, getUserById);
router.delete('/deleteUser/:id',isAuthenticated,deleteUser);




module.exports = router;