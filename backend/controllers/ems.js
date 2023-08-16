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
const LeaveApplication = require("../validation/LeaveApplication")
const PortalValidation = require("../validation/PortalValidation")
const PositionValidation=require("../validation/PositionValidation")
const SalaryValidation=require("../validation/SalaryValidation")
const WorkExpValidation=require("../validation/WorkExpValidation")

const Joi = require("joi")


exports.getRole = async(req,res)=>{
    RoleSchema.find()
        .populate("company")
        .exec((err,role)=>{
            res.send(role);
        })
}

exports.addRole=async(req,res)=>{
    Joi.validate(req.body,RoleValidation,(err,result)=>{
        if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
          } else {
            let newRole;
      
            newRole = {
              RoleName: req.body.RoleName,
              company: req.body.CompanyID
            };
           RoleSchema.create(newRole,function(err,role){
            if (err) {
                console.log(err);
                res.send("error");
              } else {
                res.send(role);
                console.log("new Role Saved");
              }
           });
           console.log(req.body) 
        }
    })
}

exports.updateRole=async(req,res)=>{
    Joi.validate(req.body, RoleValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let updateRole;
    
          updateRole = {
            RoleName: req.body.RoleName,
            company: req.body.CompanyID
          };
    
          RoleSchema.findByIdAndUpdate(req.params.id, updateRole, function (err, role) {
            if (err) {
              res.send("error");
            } else {
              res.send(updateRole);
            }
          });
        }
    
        console.log("put");
        console.log(req.body);
      });
}

exports.deleteRole=async(req,res)=>{
    EmployeeSchema.find({ role: req.params.id }, function (err, r) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          if (r.length == 0) {
            RoleSchema.findByIdAndRemove({ _id: req.params.id }, function (err, role) {
              if (!err) {
                console.log(" Role deleted");
                res.send(role);
              } else {
                console.log("error");
                res.send("err");
              }
            });
            console.log("delete");
            console.log(req.params.id);
          } else {
            res
              .status(403)
              .send(
                "This role is associated with Employee so you can not delete this"
              );
          }
        }
      });
}

