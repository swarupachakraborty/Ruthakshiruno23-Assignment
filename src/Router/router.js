const express = require('express');
const router = express.Router();

const userController = require("../Controller/userController")
const adminController=require('../Controller/adminController')
const vaccineController=require("../Controller/vaccineController")
router.post("/register",userController.CreateUser)
router.post("/registeradmin",adminController.createAdmin)
router.post("/loginn",userController.userLogin)
router.post("/vaccine",vaccineController.createvaccine)
module.exports=router;