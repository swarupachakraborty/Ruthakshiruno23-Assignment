const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId
const vaccineSchema = new mongoose.Schema({
    vaccine_name:{
        type:String,
        required:true
    },
    userId: {
        type: ObjectId,
        ref: 'usersdatas',
        required: true,
        trim: true
    },

    vaccine_dose:{
        type:Number,
        required:true
    },
    vaccine_time:{
        type:String,
        required:true
    },
    vaccine_date:{
        type:Date,
        required:true,
        default:Date.now()
    }
}, { timestamps: true })

module.exports = mongoose.model("vaccine", vaccineSchema)

