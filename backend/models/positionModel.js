const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PositionSchema = new Schema({
    PositionName: { type: String, required: true },
    company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
})

module.exports = mongoose.model("Position",PositionSchema)