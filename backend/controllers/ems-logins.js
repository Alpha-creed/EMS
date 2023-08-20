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

exports.LoginUser = async(req,res)=>{
    Joi.validate(
        req.body,
        Joi.object().keys({
          email: Joi.string()
            .max(200)
            .required(),
          password: Joi.string()
            .max(100)
            .required()
        }),
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(400).send(err.details[0].message);
          } else {
            EmployeeSchema.findOne(
              { Email: req.body.email },
              "Password _id Account FirstName LastName",
              function (err, document) {
                if (err || document == null) {
                  res.send("false");
                } else {
                  if (document.Password == req.body.password) {
                    emp = {
                      _id: document._id,
                      Account: document.Account,
                      FirstName: document.FirstName,
                      LastName: document.LastName
                    };
                    var token = jwt.sign(emp, jwtKey);
                    res.send(token);
                  } else {
                    res.sendStatus(400);
                  }
                }
              }
            );
          }
        }
      );
    
}