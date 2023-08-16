const mongoose = require('mongoose');
const Schema = mongoose.Schema

const EducationSchema = new Schema({
    SchoolUniversity: { type: String, required: true },
    Degree: { type: String, required: true },
    Grade: { type: String, required: true },
    PassingOfYear: { type: String, required: true }
},{
    timestamps:true
})

module.exports = mongoose.model("Education",EducationSchema)