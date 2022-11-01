const express = require('express');
const router = new express.Router();
const { createRepair, getRepairs, getRepairById, deleteRepair } = require('../controllers/repairController');

router.post('/createRepair',createRepair);
router.get('/getRapairs',getRepairs);
router.get('/getRepair/:id',getRepairById);
router.post('/deleteRepair/:id',deleteRepair);



module.exports = router;