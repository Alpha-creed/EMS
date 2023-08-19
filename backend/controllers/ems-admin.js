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
const ProjectValidation = require("../validation/ProjectValidation")

const Joi = require("joi")

exports.getAdminPortal = async(req,res)=>{
    PortalSchema.find()
    .populate({ path: "projects" })//check for error and include the projects schema ref in th portal database
    .exec(function (err, portalData) {
      if (err) {
        res.send("err");
        console.log(err);
      }
      res.send(portalData);
    });
}

exports.addAdminPortal = async(req,res)=>{
    Joi.validate(req.body, PortalValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newPortal;
          newPortal = {
            PortalName: req.body.PortalName,
            Status: req.body.Status
          };
    
          PortalSchema.create(newPortal, function (err, portalData) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              res.send(portalData);
              console.log("new Portal Saved");
            }
          });
          console.log(req.body);
        }
      });
}

exports.updateAdminPortal = async(req,res)=>{
    Joi.validate(req.body, PortalValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let updatePortal;
          updatePortal = {
            PortalName: req.body.PortalName,
            Status: req.body.Status
          };
          PortalSchema.findByIdAndUpdate(req.body._id, updatePortal, function (
            err,
            Portal
          ) {
            if (err) {
              res.send("error");
            } else {
              res.send(updatePortal);
            }
          })
        }
        console.log("put");
    console.log(req.body);
    })
}

exports.deleteAdminPortal = async(req,res)=>{
    PortalSchema.findByIdAndRemove({ _id: req.params.id }, function (err, portal) {
        if (!err) {
          console.log("portal deleted");
          res.send(portal);
          ProjectSchema.deleteMany({ portals: { _id: portal._id } }, function (err) {
            if (err) {
              res.send("error");
              console.log(err);
            }
          });
          console.log("new Portal Saved");
        } else {
          console.log("error");
          res.send("err");
        }
      });
      console.log("delete");
      console.log(req.params.id);
    
}

exports.getAdminProjectBid = async(req,res)=>{
    ProjectSchema.find()
    .populate("portals")
    .exec(function (err, project) {
      if (err) {
        console.log(err);
        res.send("err");
      } else {
        res.send(project);
      }
    });
}

exports.addAdminProjectBid = async(req,res)=>{
    Joi.validate(req.body, ProjectValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let project;
          project = {
            ProjectTitle: req.body.ProjectTitle,
            ProjectURL: req.body.ProjectURL,
            ProjectDesc: req.body.ProjectDesc,
            portals: req.body.Portal_ID,
            EstimatedTime: req.body.EstimatedTime,
            EstimatedCost: req.body.EstimatedCost,
            ResourceID: req.body.ResourceID,
            Status: req.body.Status,
            Remark: req.body.Remark
          };
          ProjectSchema.create(project, function (err, project) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              res.send(project);
              console.log("new project Saved");
            }
          });
          console.log(req.body);
        }
      });
}

exports.updateAdminProjectBid = async(req,res)=>{
    Joi.validate(req.body, ProjectValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let updateProject;
          updateProject = {
            ProjectTitle: req.body.ProjectTitle,
            ProjectURL: req.body.ProjectURL,
            ProjectDesc: req.body.ProjectDesc,
            portals: req.body.Portal_ID,
            EstimatedTime: req.body.EstimatedTime,
            EstimatedCost: req.body.EstimatedCost,
            ResourceID: req.body.ResourceID,
            Status: req.body.Status,
            Remark: req.body.Remark
          };
    
          ProjectSchema.findByIdAndUpdate(req.params.id, updateProject, function (
            err,
            Project
          ) {
            if (err) {
              res.send("error");
            } else {
              res.send(updateProject);
            }
          });
        }
    
        console.log("put");
        console.log(req.body);
      });
}

exports.deleteAdminProjectBid = async(req,res)=>{
    ProjectSchema.findByIdAndRemove({ _id: req.params.id }, function (err, project) {
        if (err) {
          console.log("error");
          res.send("err");
        } else {
          console.log("project deleted");
          res.send(project);
        }
      });
      console.log("delete");
      console.log(req.params.id);    
}