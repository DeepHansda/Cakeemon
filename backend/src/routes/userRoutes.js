const express = require('express');
const router = new express.Router();
const {signUp, login, getUsers, getUserById, logout, userDetails, deleteUser} = require('../controllers/userController')
const upload = require('../middleware/multerUpload')
const isAuthenticated = require('../middleware/auth')
const cors = require("cors");

const corsOptions = {
    origin:"http://localhost:3000" ,
    credentials: true,
    "Access-Control-Allow-Credentials": "true",
    'Access-Control-Allow-Headers' : 'Origin X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept Cookie',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,UPDATE",
    // "Access-Control-Allow-Origin": "*",

  }

router.post('/signUp',upload.single('img'),signUp);
router.post('/login',login);
router.post('/logout',logout);
router.get('/getUsers',isAuthenticated,getUsers);
router.get('/userDetails',isAuthenticated,userDetails);
router.get('/getUser/:id',isAuthenticated, getUserById);
router.delete('/deleteUser/:id',isAuthenticated,deleteUser);




module.exports = router;