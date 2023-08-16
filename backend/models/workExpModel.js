const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkExperienceSchema = new Schema({
    CompanyName: { type: String, required: true },
    Designation: { type: String, required: true },
    FromDate: { type: Date, required: true },
    ToDate: { type: Date, required: true }
},{
    timestamps:true
})

module.exports = mongoose.model("WorkExperience",WorkExperienceSchema)