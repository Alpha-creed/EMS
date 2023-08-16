const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SalarySchema = new Schema({
    BasicSalary: { type: String, required: true },
    BankName: { type: String, required: true },
    AccountNo: { type: String, required: true },
    AccountHolderName: { type: String, required: true },
    IFSCcode: { type: String, required: true },
    TaxDeduction: { type: String, required: true }
},{
    timestamps:true
})

module.exports =mongoose.model("Salary",SalarySchema)