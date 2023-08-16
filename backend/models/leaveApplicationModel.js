const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LeaveApplicationSchema = new Schema({
    Leavetype: { type: String, required: true },
    FromDate: { type: Date, required: true },
    ToDate: { type: Date, required: true },
    Reasonforleave: { type: String, required: true },
    Status: { type: String, required: true },
    employee: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }]
},{
    timestamps:true
})

module.exports = mongoose.model("LeaveApplication",LeaveApplicationSchema)
