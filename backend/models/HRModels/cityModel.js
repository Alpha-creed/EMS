const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CitySchema = new Schema({
    CityName: { type: String, required: true },
    state: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }]
},{
    timestamps:true
})

module.exports = mongoose.model("City",CitySchema)
