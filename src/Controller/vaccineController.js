const mongoose = require('mongoose')
const userModel= require('../Models/userModel')
const vaccineModel=require("../Models/vaccineModel")
const{isValid}=require("../Controller/userController")

const createvaccine = async (req, res) => {

    try {
        // Extract body 
        const reqBody = req.body;
  
        // Object Destructing
        const { vaccine_name,vaccine_dose, userId, vaccine_time
        } = reqBody;
  
        
        // Check excerpt is coming or not 
        if (!isValid(vaccine_name)) {
            return res.status(400).send({ status: false, message: 'Excerpt is Required' });
        }
  
       
  
        // Check userId is coming or not
        if (!isValid(userId)) {
            return res.status(400).send({ status: false, message: 'userId is Required' });
        }
  
        if (!isValid(vaccine_dose)) {
            return res.status(400).send({ status: false, message: 'vaccine is required' });
        }

   if (!isValid(vaccine_time)) {
            return res.status(400).send({ status: false, message: 'Time is Required' });
        }
        vaccineDetail = await vaccineModel.create(reqBody)
      return res.status(201).send({ status: true, message: 'successfully created ', data: { vaccineDetail } })
          
  } catch (err) {
      console.log(err)
      return res.status(500).send({ status: false, message: err.message })  
};
 }
 module.exports={createvaccine};