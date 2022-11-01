const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    
  name: {type:String, required:true},
  
phone: {
    trim: true,
    type: Number,
    required: ' mobile is required',
    unique: true,
    validate: {
        validator: function (phone) {
            return /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(phone)
        }, message: 'Please fill a valid mobile number', isAsync: false
    }
},
  adharno: {type:String, required:true},
  pincode:{type:String,required:true},
  age:{type:Number,required:true},
  password:{type:String,required:true}
},{timestamps:true})




module.exports = mongoose.model('usersdatas', UserSchema)
