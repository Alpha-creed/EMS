const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StateSchema = new Schema({
    StateName: { type: String, required: true },
    country: [{ type: mongoose.Schema.Types.ObjectId, ref: "Country" }],
    cities: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }]
},{
    timestamps:true
})

module.exports = mongoose.model("State",StateSchema)
