const CompanySchema = require('../models/companyModel')
const DepartmentSchema = require("../models/departmentModel")
const EducationSchema = require('../models/educationModel')
const EmployeeSchema = require("../models/EmployeeModel")
const FamilyInfoSchema = require('../models/familyInfoModel')
const LeaveApplicationSchema = require("../models/leaveApplicationModel")
const PortalSchema=require("../models/portalModel")
const PositionSchema=require("../models/positionModel")
const ProjectSchema = require("../models/projectModel")
const RoleSchema = require("../models/roleModel")
const SalarySchema = require("../models/salaryModel")
const WorkExperienceSchema=require("../models/workExpModel")
const CitySchema=require("../models/HRModels/cityModel")
const CountrySchema=require("../models/HRModels/countryModel")
const StateSchema = require("../models/HRModels/stateModel")

const RoleValidation = require("../validation/RoleValidation")
const CityValidation=require("../validation/HR/CityValidation")
const CountryValidation=require("../validation/HR/CountryValidation")
const StateValidation=require("../validation/HR/StateValidation")
const CompanyValidation = require("../validation/CompanyValidation")
const DepartmentValidation = require("../validation/DepartmentValidation")
const EducationValidation=require("../validation/EducationValidation")
const EmployeeValidation = require("../validation/EmployeeValidation")
const EmployeePersonalInfoValidation=require("../validation/EmployeeValidation")
const EmployeeValidationUpdate=require("../validation/EmployeeValidation")
const FamilyInfoValidation=require("../validation/FamilyInfoValidation")
const LeaveApplicationHRValidation = require("../validation/LeaveApplication")
const LeaveApplicationEmpValidation =require("../validation/LeaveApplication")
const PortalValidation = require("../validation/PortalValidation")
const PositionValidation=require("../validation/PositionValidation")
const SalaryValidation=require("../validation/SalaryValidation")
const WorkExperienceValidation=require("../validation/WorkExpValidation")

const Joi = require("joi")

exports.getEmpLeaveApplication = async(req,res)=>{
    console.log(req.params.id);
  // var employee = {};
  // {path: 'projects', populate: {path: 'portals'}}
  EmployeeSchema.findById(req.params.id)
    // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
    .populate({
      path: "leaveApplication"
      // populate: {
      //   path: "state",
      //   model: "State",
      //   populate: {
      //     path: "country",
      //     model: "Country"
      //   }
      // }
    })
    // .select(" -role -position -department")
    .select("FirstName LastName MiddleName")
    .exec(function (err, employee) {
      // console.log(filteredCompany);
      if (err) {
        console.log(err);
        res.send("error");
      } else {
        res.send(employee);
      }
    });
}

exports.addEmpLeaveApplication = async(req,res)=>{
    Joi.validate(req.body, LeaveApplicationEmpValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          EmployeeSchema.findById(req.params.id, function (err, employee) {
            if (err) {
              console.log(err);
              res.send("err");
            } else {
              let newLeaveApplication;
              newLeaveApplication = {
                Leavetype: req.body.Leavetype,
                FromDate: req.body.FromDate,
                ToDate: req.body.ToDate,
                Reasonforleave: req.body.Reasonforleave,
                Status: req.body.Status,
                employee: req.params.id
              };
    
              LeaveApplicationSchema.create(newLeaveApplication, function (
                err,
                leaveApplication
              ) {
                if (err) {
                  console.log(err);
                  res.send("error");
                } else {
                  employee.leaveApplication.push(leaveApplication);
                  employee.save(function (err, data) {
                    if (err) {
                      console.log(err);
                      res.send("err");
                    } else {
                      console.log(data);
                      res.send(leaveApplication);
                    }
                  });
                  console.log("new leaveApplication Saved");
                }
              });
              console.log(req.body);
            }
          });
        }
      });
}

exports.updateEmpLeaveApplication = async(req,res)=>{
    Joi.validate(req.body, LeaveApplicationEmpValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newLeaveApplication;
    
          newLeaveApplication = {
            Leavetype: req.body.Leavetype,
            FromDate: req.body.FromDate,
            ToDate: req.body.ToDate,
            Reasonforleave: req.body.Reasonforleave,
            Status: req.body.Status,
            employee: req.params.id
          };
    
          LeaveApplicationSchema.findByIdAndUpdate(
            req.params.id,
            newLeaveApplication,
            function (err, leaveApplication) {
              if (err) {
                res.send("error");
              } else {
                res.send(newLeaveApplication);
              }
            }
          );
        }
        console.log("put");
        console.log(req.body);
      });
}

exports.deleteEmpLeaveApplication = async(req,res)=>{
    EmployeeSchema.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
          res.send("error");
          console.log(err);
        } else {
          LeaveApplicationSchema.findByIdAndRemove({ _id: req.params.id2 }, function (
            err,
            leaveApplication
          ) {
            if (!err) {
              console.log("LeaveApplication deleted");
              EmployeeSchema.update(
                { _id: req.params.id },
                { $pull: { leaveApplication: req.params.id2 } },
                function (err, numberAffected) {
                  console.log(numberAffected);
                  res.send(leaveApplication);
                }
              );
            } else {
              console.log(err);
              res.send("error");
            }
          });
          console.log("delete");
          console.log(req.params.id);
        }
      });
}


///////////////////////////////////////////////////////
///////LeaveApplication leaveApplication HR///////////
/////////////////////////////////////////////////////
exports.getHrLeaveApplication = async(req,res)=>{
    // var employee = {};
  // {path: 'projects', populate: {path: 'portals'}}
  LeaveApplicationSchema.find()
  // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
  .populate({
    path: "employee"
  })
  // .select(" -role -position -department")
  // .select("FirstName LastName MiddleName"
  // )
  .exec(function (err, leaveApplication) {
    // console.log(filteredCompany);
    if (err) {
      console.log(err);
      res.send("error");
    } else {
      res.send(leaveApplication);
    }
  });

}

exports.updateHrLeaveApplication = async(req,res)=>{
    Joi.validate(req.body, LeaveApplicationHRValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newLeaveApplication;
    
          newLeaveApplication = {
            Status: req.body.Status
          };
          LeaveApplicationSchema.findByIdAndUpdate(
            req.params.id,
            {
              $set: newLeaveApplication
            },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(newLeaveApplication);
            }
          );
    
          console.log(req.body);
        }
      });
    
}

exports.deleteHrLeaveApplication = async(req,res)=>{
    EmployeeSchema.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
          res.send("error");
          console.log(err);
        } else {
          LeaveApplicationSchema.findByIdAndRemove({ _id: req.params.id2 }, function (
            err,
            leaveApplication
          ) {
            if (!err) {
              console.log("LeaveApplication deleted");
              EmployeeSchema.update(
                { _id: req.params.id },
                { $pull: { leaveApplication: req.params.id2 } },
                function (err, numberAffected) {
                  console.log(numberAffected);
                  res.send(leaveApplication);
                }
              );
            } else {
              console.log(err);
              res.send("error");
            }
          });
          console.log("delete");
          console.log(req.params.id);
        }
      });
}

