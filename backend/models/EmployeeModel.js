const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EmployeeSchema = new Schema({
    FirstName:{type:String,required:true},
    LastName:{type:String,required:true},
    Email:{type:String,required:true},
    Password:{type:String,required:true},
    Gender:{type:String,required:true},
    DOB:{type:Date},
    DateOfJoining:{type:Date},
    TerminateDate:{type:Date},
    Deleted:{type:Boolean},
    Photo:{type:String},
    ContactNo:{type:String},
    EmployeeCode:{type:String,required:true},
    Account:{type:Number},
    role:[{type:mongoose.Schema.Types.ObjectId,ref:"Role"}],
    position:[{type:mongoose.Schema.Types.ObjectId,ref:"Position"}],
    department:[{type:mongoose.Schema.Types.ObjectId,ref:"Department"}],
    salary:[{type:mongoose.Schema.Types.ObjectId,ref:"Salary"}],
    education:[{type:mongoose.Schema.Types.ObjectId,ref:"Education"}],
    familyInfo:[{type:mongoose.Schema.Types.ObjectId,ref:"FamilyInfo"}],
    workExperience: [
        { type: mongoose.Schema.Types.ObjectId, ref: "WorkExperience" }
      ],
      leaveApplication: [
        { type: mongoose.Schema.Types.ObjectId, ref: "LeaveApplication" }
      ],
      BloodGroup: { type: String },
      EmergencyContactNo: { type: String },
      Hobbies: { type: String },
      PANcardNo: { type: String },
      PermanetAddress: { type: String },
      PresentAddress: { type: String }
},{
    timestamps:true
})

module.exports = mongoose.model("Employee",EmployeeSchema)