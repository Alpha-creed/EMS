const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoleSchema = new Schema({
    RoleName: { type: String, required: true },
    company: [{ type: mongoose.Schema.Types.ObjectId, ref: "Company" }]
},{
    timestamps:true
})

module.exports = mongoose.model("Role",RoleSchema)
