const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FamilyInfoSchema = new Schema({
    Name: { type: String, required: true },
    Relationship: { type: String, required: true },
    DOB: { type: Date, required: true },
    Occupation: { type: String, required: true }
},{
    timestamps:true
})


module.exports = mongoose.model("FamilyInfo",FamilyInfoSchema);