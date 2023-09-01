import mongoose from "mongoose";

const agencySchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    location: {type: String},
    type: {type: String, required: true},
    phone_number: {type: String, required: true},
    security_question: {type: String, required: true},
    security_answer: {type: String, required: true}, 
    longitude:{type:String},
    latitude:{type:String},
    licenseNo: {type: String, required: true},
    //resources
    //location - type:Point GeoJSON
})

export default mongoose.model('Agency', agencySchema);