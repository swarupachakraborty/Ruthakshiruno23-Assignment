const adminModel = require("../Models/adminModel")
 const{isValid}=require("../Controller/userController")
const createAdmin = async (req, res) => {

    try {
        // Extract body 
        const reqBody = req.body;
         let admin=req.body
        // Object Destructing
        const { phone,password
        } = admin;
  
        // Check data is coming or not
        
        
        if (!isValid (phone)) {
            return res.status(400).send({status: false, msg: "Enter phone no. " })
        }

        if (!(/^[6-9]\d{9}$/.test(phone))) {
            return res.status(400).send({ status: false, message: `Phone number should be a valid number` })

        }
        
        const isphone = await adminModel.findOne({ phone })
        if (isphone) {
            return res.status(400).send({status: false, msg: "Phone no.  is already used" })
        }
        if (!isValid(password)) {
            return res.status(400).send({status: false,  msg: "Enter Valid password " })
        }
        const Admin = await adminModel.create(admin)
        return res.status(201).send({ Status: true, msg: "Data sucessfully Created", data: Admin })

    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}
module.exports={createAdmin};