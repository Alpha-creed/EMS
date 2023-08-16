const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CountrySchema = new Schema({
    CountryName: { type: String, required: true },
  states: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }]
},{
  timestamps:true
})

module.exports =mongoose.model("Country",CountrySchema)
