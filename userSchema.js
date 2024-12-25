const mongoose = require('mongoose');

const userDetailsSchema = new mongoose.Schema(
    
    {
        name: String,
        email: { type: String, unique: true, require: true },
        mobileNumber : Number,
        city:String,
        state:String,
        applyfor:String, 
        workexperience:String,
        registrationDate: { type: Date, default: Date.now },

    },
    {
        collection: "userInfo",
    }
);

const contactSchema = new mongoose.Schema({
    companyname : String,
    servicename : String,
    email: { type: String, required: true },
    phoneNumber : Number,
    message : String,
    registrationDate: { type: Date, default: Date.now },
  
},
    {
        collection: "CantactDetails",
    }
);

const UserInfo = mongoose.model("userInfo", userDetailsSchema);
const Contact = mongoose.model("Contact", contactSchema);


module.exports = { UserInfo, Contact};