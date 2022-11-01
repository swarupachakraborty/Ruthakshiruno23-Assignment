const UserModel = require("../Models/userModel")
 const jwt=require('jsonwebtoken')
const userModel = require("../Models/userModel")




const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}



const CreateUser = async function (req, res) {
    try {
        let user = req.body
        let {  name,  phone,adharno,pincode,age ,password } = user

        if (!isValidRequestBody(user)) {
            return res.status(400).send({ status: false, msg: "enter data in user body" })
        }
        
        if (!isValid(name)) {
            return res.status(400).send({status: false,  msg: "Enter Valid Name " })
        }
        
        
        if (!isValid(phone)) {
            return res.status(400).send({status: false, msg: "Enter phone no. " })
        }

        if (!(/^[6-9]\d{9}$/.test(phone))) {
            return res.status(400).send({ status: false, message: `Phone number should be a valid number` })

        }
        
        const isphone = await UserModel.findOne({ phone })
        if (isphone) {
            return res.status(400).send({status: false, msg: "Phone no.  is already used" })
        }
        if (!isValid(password)) {
            return res.status(400).send({status: false,  msg: "Enter Valid password " })
        }
        if (!isValid(adharno)) {
            return res.status(400).send({status: false, msg: "Enter adhar no. " })
        }
        const isadharno=await userModel.findOne({adharno})
        if (isadharno) {
            return res.status(400).send({status: false, msg: "adhar no.  is already used" })
        }
        if (!isValid(age)) {
            return res.status(400).send({status: false,  msg: "Enter Valid age " })
        }
        if (!isValid(pincode)) {
            return res.status(400).send({status: false, msg: "Enter pincode no. " })
        }

       
        
        const NewUsers = await UserModel.create(user)
        return res.status(201).send({ Status: true, msg: "Data sucessfully Created", data: NewUsers })

    }
    catch (error) {
        return res.status(500).send(error.message)
    }
}
// /////////////////////////////////////////////////////////////////////////
const userLogin = async function(req,res){
    try {
       const requestBody= req.body;
       if(!isValidRequestBody(requestBody)){
           res.status(400).send({status:false, message:'Invalid request parameters, Please provide login details'})
           return
       }

       //Extract params
       const {phone, password} = requestBody;

       //validation starts
       if(!isValid(phone)){
           res.status(400).send({status:false, message:`Phone is required`})
           return
       }
       if (!(/^[6-9]\d{9}$/.test(phone))) {
        return res.status(400).send({ status: false, message: `Phone number should be a valid number` })

    }
   
       
       if(!isValid(password)){
           res.status(400).send({status:false, message: `Password is required`})
           return
       }
       //validation ends

       const user = await userModel.findOne({phone,password});

       if(!user){
           res.status(400).send({status:false, message:`Invalid login credentials`});
           return
       }

       const token = jwt.sign({
           userId: user._id.toString(),
           batch: "uranium",
           organisation: 'FunctionUp',
            iat: new Date().getTime() /1000 
       },"My private key" ,{expiresIn:"6400min"}
           
       );

       res.header('x-api-key',token);
       res.status(200).send({status:true, message:`User login successfully`, data:{token}});

   } catch (error) {
       res.status(500).send({status:false, message:error.message});
   }
}






module.exports= {CreateUser,isValid,userLogin}

