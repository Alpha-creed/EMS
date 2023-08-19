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
const WorkExperienceValidation=require("../validation/WorkExpValidation")

const Joi = require("joi")


exports.getEmpPersonalInfo = async(req,res)=>{
    console.log("personal-info", req.params.id);
    EmployeeSchema.findById(req.params.id)
      // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
      .populate({
        path: "role position department"
        //   // populate: {
        //   //   path: "state",
        //   //   model: "State",
        //   //   populate: {
        //   //     path: "country",
        //   //     model: "Country"
        //   //   }
        //   // }
      })
      .select("-salary -education -familyInfo -workExperience")
      .exec(function (err, employee) {
        // employee = employees;
        res.send(employee);
      });
}

exports.updateEmpPersonalInfo = async(req,res)=>{
    Joi.validate(req.body, EmployeePersonalInfoValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newEmployee;
    
          newEmployee = {
            BloodGroup: req.body.BloodGroup,
            ContactNo: req.body.ContactNo,
            DOB: req.body.DOB,
            Email: req.body.Email,
            EmergencyContactNo: req.body.EmergencyContactNo,
            Gender: req.body.Gender,
            Hobbies: req.body.Hobbies,
            PANcardNo: req.body.PANcardNo,
            PermanetAddress: req.body.PermanetAddress,
            PresentAddress: req.body.PresentAddress
          };
          EmployeeSchema.findByIdAndUpdate(
            req.params.id,
            {
              $set: newEmployee
            },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(newEmployee);
            }
          );
        }
    
        console.log("put");
        console.log(req.body);
      });
}

exports.getEmpEducation= async(req,res)=>{
    console.log(req.params.id);
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    EmployeeSchema.findById(req.params.id)
      // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
      .populate({
        path: "education"
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
        res.send(employee);
      });
}

exports.addEmpEducation= async(req,res)=>{
    Joi.validate(req.body, EducationValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          EmployeeSchema.findById(req.params.id, function (err, employee) {
            if (err) {
              console.log(err);
              res.send("err");
            } else {
              let newEducation;
    
              newEducation = {
                SchoolUniversity: req.body.SchoolUniversity,
                Degree: req.body.Degree,
                Grade: req.body.Grade,
                PassingOfYear: req.body.PassingOfYear
              };
    
              EducationSchema.create(newEducation, function (err, education) {
                if (err) {
                  console.log(err);
                  res.send("error");
                } else {
                  employee.education.push(education);
                  employee.save(function (err, data) {
                    if (err) {
                      console.log(err);
                      res.send("err");
                    } else {
                      console.log(data);
                      res.send(education);
                    }
                  });
                  console.log("new Education Saved");
                }
              });
              console.log(req.body);
            }
          });
        }
      });
    
}

exports.updateEmpEducation= async(req,res)=>{
    Joi.validate(req.body, EducationValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newEducation;
    
          newEducation = {
            SchoolUniversity: req.body.SchoolUniversity,
            Degree: req.body.Degree,
            Grade: req.body.Grade,
            PassingOfYear: req.body.PassingOfYear
          };
    
          EducationSchema.findByIdAndUpdate(req.params.id, newEducation, function (
            err,
            education
          ) {
            if (err) {
              res.send("error");
            } else {
              res.send(newEducation);
            }
          });
        }
        console.log("put");
        console.log(req.body);
      });
}

exports.deleteEmpEducation= async(req,res)=>{
    EmployeeSchema.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
          res.send("error");
          console.log(err);
        } else {
          EducationSchema.findByIdAndRemove({ _id: req.params.id2 }, function (
            err,
            education
          ) {
            if (!err) {
              console.log("education deleted");
              EmployeeSchema.update(
                { _id: req.params.id },
                { $pull: { education: req.params.id2 } },
                function (err, numberAffected) {
                  console.log(numberAffected);
                  res.send(education);
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

//////////////////////
/////Family Info/////
////////////////////

exports.getEmpFamilyInfo= async(req,res)=>{
    console.log(req.params.id);
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    EmployeeSchema.findById(req.params.id)
      // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
      .populate({
        path: "familyInfo"
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
        res.send(employee);
      });
}

exports.addEmpFamilyInfo= async(req,res)=>{
    Joi.validate(req.body, FamilyInfoValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          EmployeeSchema.findById(req.params.id, function (err, employee) {
            if (err) {
              console.log(err);
              res.send("err");
            } else {
              let newFamilyInfo;
    
              newFamilyInfo = {
                Name: req.body.Name,
                Relationship: req.body.Relationship,
                DOB: req.body.DOB,
                Occupation: req.body.Occupation
              };
    
              FamilyInfoSchema.create(newFamilyInfo, function (err, familyInfo) {
                if (err) {
                  console.log(err);
                  res.send("error");
                } else {
                  employee.familyInfo.push(familyInfo);
                  employee.save(function (err, data) {
                    if (err) {
                      console.log(err);
                      res.send("err");
                    } else {
                      console.log(data);
                      res.send(familyInfo);
                    }
                  });
                  console.log("new familyInfo Saved");
                }
              });
              console.log(req.body);
            }
          });
        }
      });
}

exports.updateEmpFamilyInfo= async(req,res)=>{
    Joi.validate(req.body, FamilyInfoValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newFamilyInfo;
    
          newFamilyInfo = {
            Name: req.body.Name,
            Relationship: req.body.Relationship,
            DOB: req.body.DOB,
            Occupation: req.body.Occupation
          };
    
          FamilyInfoSchema.findByIdAndUpdate(req.params.id, newFamilyInfo, function (
            err,
            familyInfo
          ) {
            if (err) {
              res.send("error");
            } else {
              res.send(newFamilyInfo);
            }
          });
        }
        console.log("put");
        console.log(req.body);
      });
}

exports.deleteEmpFamilyInfo= async(req,res)=>{
    EmployeeSchema.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
          res.send("error");
          console.log(err);
        } else {
          FamilyInfoSchema.findByIdAndRemove({ _id: req.params.id2 }, function (
            err,
            familyInfo
          ) {
            if (!err) {
              console.log("FamilyInfo deleted");
              EmployeeSchema.update(
                { _id: req.params.id },
                { $pull: { familyInfo: req.params.id2 } },
                function (err, numberAffected) {
                  console.log(numberAffected);
                  res.send(familyInfo);
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
///////////
//WorkExp//
//////////

exports.getEmpWorkExp= async(req,res)=>{
    console.log(req.params.id);
    // var employee = {};
    // {path: 'projects', populate: {path: 'portals'}}
    EmployeeSchema.findById(req.params.id)
      // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
      .populate({
        path: "workExperience"
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
        res.send(employee);
      });
}

exports.addEmpWorkExp= async(req,res)=>{
    Joi.validate(req.body, WorkExperienceValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          EmployeeSchema.findById(req.params.id, function (err, employee) {
            if (err) {
              console.log(err);
              res.send("err");
            } else {
              let newWorkExperience;
    
              newWorkExperience = {
                CompanyName: req.body.CompanyName,
                Designation: req.body.Designation,
                FromDate: req.body.FromDate,
                ToDate: req.body.ToDate
              };
    
              WorkExperienceSchema.create(newWorkExperience, function (
                err,
                workExperience
              ) {
                if (err) {
                  console.log(err);
                  res.send("error");
                } else {
                  employee.workExperience.push(workExperience);
                  employee.save(function (err, data) {
                    if (err) {
                      console.log(err);
                      res.send("err");
                    } else {
                      console.log(data);
                      res.send(workExperience);
                    }
                  });
                  console.log("new WorkExperience Saved");
                }
              });
              console.log(req.body);
            }
          });
        }
      });
    
}

exports.updateEmpWorkExp= async(req,res)=>{
    Joi.validate(req.body, WorkExperienceValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newWorkExperience;
    
          newWorkExperience = {
            CompanyName: req.body.CompanyName,
            Designation: req.body.Designation,
            FromDate: req.body.FromDate,
            ToDate: req.body.ToDate
          };
    
          WorkExperienceSchema.findByIdAndUpdate(
            req.params.id,
            newWorkExperience,
            function (err, workExperience) {
              if (err) {
                res.send("error");
              } else {
                res.send(newWorkExperience);
              }
            }
          );
        }
        console.log("put");
        console.log(req.body);
      });
}

exports.deleteEmpWorkExp= async(req,res)=>{
    EmployeeSchema.findById({ _id: req.params.id }, function (err, employee) {
        if (err) {
          res.send("error");
          console.log(err);
        } else {
          WorkExperienceSchema.findByIdAndRemove({ _id: req.params.id2 }, function (
            err,
            workExperience
          ) {
            if (!err) {
              console.log("WorkExperience deleted");
              EmployeeSchema.update(
                { _id: req.params.id },
                { $pull: { workExperience: req.params.id2 } },
                function (err, numberAffected) {
                  console.log(numberAffected);
                  res.send(workExperience);
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