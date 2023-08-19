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

exports.getPosition=async(req,res)=>{
  PositionSchema.find()
  .populate("company")
  .exec(function (err, role) {
    res.send(role);
  });
}

exports.addPosition=async(req,res)=>{
  Joi.validate(req.body, PositionValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newPosition;

      newPosition = {
        PositionName: req.body.PositionName,
        company: req.body.CompanyID
      };

      Position.create(newPosition, function (err, position) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(position);
          console.log("new Position Saved");
        }
      });
    }
    console.log(req.body);
  });
}

exports.updatePosition=async(req,res)=>{
  Joi.validate(req.body, PositionValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updatePosition;

      updatePosition = {
        PositionName: req.body.PositionName,
        company: req.body.CompanyID
      };

      PositionSchema.findByIdAndUpdate(req.params.id, updatePosition, function (
        err,
        position
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(updatePosition);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
}

exports.deletePosition=async(req,res)=>{
  EmployeeSchema.find({ position: req.params.id }, function (err, p) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (p.length == 0) {
        PositionSchema.findByIdAndRemove({ _id: req.params.id }, function (
          err,
          position
        ) {
          if (!err) {
            console.log("position deleted");
            res.send(position);
            // });
            console.log("new Position Saved");
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
            "This Position is associated with Employee so you can not delete this"
          );
      }
    }
  });
}

exports.getDepartment=async(req,res)=>{
  DepartmentSchema.find()
  .populate("company")
  .exec(function (err, employees) {
    res.send(employees);
  });
}

exports.addDepartment=async(req,res)=>{
  Joi.validate(req.body, DepartmentValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newDepartment;

      newDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID
      };

      DepartmentSchema.create(newDepartment, function (err, department) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(department);
          console.log("new department Saved");
        }
      });
    }
    console.log(req.body);
  });
}

exports.updateDepartment=async(req,res)=>{
  Joi.validate(req.body, DepartmentValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let updateDepartment;

      updateDepartment = {
        DepartmentName: req.body.DepartmentName,
        company: req.body.CompanyID
      };

      DepartmentSchema.findByIdAndUpdate(req.params.id, updateDepartment, function (
        err,
        department
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(updateDepartment);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
}

exports.deleteDepartment=async(req,res)=>{
  EmployeeSchema.find({ department: req.params.id }, function (err, d) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (d.length == 0) {
        DepartmentSchema.findByIdAndRemove({ _id: req.params.id }, function (
          err,
          department
        ) {
          if (!err) {
            console.log("department deleted");
            res.send(department);
            // });
            console.log("new Department Saved");
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
            "This department is associated with Employee so you can not delete this"
          );
      }
    }
  });
}

exports.getEmployee=async(req,res)=>{
   // {path: 'projects', populate: {path: 'portals'}}
   EmployeeSchema.find()
   // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
   .populate({
     path: "role position department"
     // populate: {
     //   path: "state",
     //   model: "State",
     //   populate: {
     //     path: "country",
     //     model: "Country"
     //   }
     // }
   })
   .select("-salary -education -familyInfo -workExperience -Password")
   .exec(function (err, employee) {
     res.send(employee);
   });
}

exports.addEmployee=async(req,res)=>{
  Joi.validate(req.body, EmployeeValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newEmployee;

      newEmployee = {
        Email: req.body.Email,
        Password: req.body.Password,
        role: req.body.RoleID,
        Account: req.body.Account,
        Gender: req.body.Gender,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        DOB: req.body.DOB,
        ContactNo: req.body.ContactNo,
        EmployeeCode: req.body.EmployeeCode,
        department: req.body.DepartmentID,
        position: req.body.PositionID,
        DateOfJoining: req.body.DateOfJoining,
        TerminateDate: req.body.TerminateDate
      };

      EmployeeSchema.create(newEmployee, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("error");
        } else {
          res.send(employee);

          console.log("new employee Saved");
        }
      });
      console.log(req.body);
    }
  });
}

exports.updateEmployee=async(req,res)=>{
  Joi.validate(req.body, EmployeeValidationUpdate, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newEmployee;
      newEmployee = {
        Email: req.body.Email,
        // Password: req.body.Password,
        Account: req.body.Account,
        role: req.body.RoleID,
        Gender: req.body.Gender,
        FirstName: req.body.FirstName,
        MiddleName: req.body.MiddleName,
        LastName: req.body.LastName,
        DOB: req.body.DOB,
        ContactNo: req.body.ContactNo,
        EmployeeCode: req.body.EmployeeCode,
        department: req.body.DepartmentID,
        position: req.body.PositionID,
        DateOfJoining: req.body.DateOfJoining,
        TerminateDate: req.body.TerminateDate
      };

      EmployeeSchema.findByIdAndUpdate(req.params.id, newEmployee, function (
        err,
        employee
      ) {
        if (err) {
          res.send("error");
        } else {
          res.send(newEmployee);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });

}

exports.deleteEmployee=async(req,res)=>{
    // Employee.findByIdAndRemove({ _id: req.params.id }, function (err, employee) {
  //   if (!err) {
  //     console.log(" state deleted");
  //     res.send(employee);
  //   } else {
  //     console.log(err);
  //     res.send("error");
  //   }
  // });
  res.send("error");
  console.log("delete");
  console.log(req.params.id);
}

exports.getSalary=async(req,res)=>{
  // var employee = {};
  // {path: 'projects', populate: {path: 'portals'}}
  EmployeeSchema.find()
    // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
    .populate({
      path: "salary"
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
    .exec(function (err, company) {
      // employee = employees;
      let filteredCompany = company.filter(data => data["salary"].length == 1);
      // console.log(filteredCompany);
      res.send(filteredCompany);
    });
}

exports.addSalary=async(req,res)=>{
  Joi.validate(req.body, SalaryValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      EmployeeSchema.findById(req.params.id, function (err, employee) {
        if (err) {
          console.log(err);
          res.send("err");
        } else {
          if (employee.salary.length == 0) {
            let newSalary;

            newSalary = {
              BasicSalary: req.body.BasicSalary,
              BankName: req.body.BankName,
              AccountNo: req.body.AccountNo,
              AccountHolderName: req.body.AccountHolderName,
              IFSCcode: req.body.IFSCcode,
              TaxDeduction: req.body.TaxDeduction
            };

            SalarySchema.create(newSalary, function (err, salary) {
              if (err) {
                console.log(err);
                res.send("error");
              } else {
                employee.salary.push(salary);
                employee.save(function (err, data) {
                  if (err) {
                    console.log(err);
                    res.send("err");
                  } else {
                    console.log(data);
                    res.send(salary);
                  }
                });
                console.log("new salary Saved");
              }
            });
            console.log(req.body);
          } else {
            res
              .status(403)
              .send("Salary Information about this employee already exits");
          }
        }
      });
    }
  });

}

exports.updateSalary=async(req,res)=>{
  Joi.validate(req.body, SalaryValidation, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.details[0].message);
    } else {
      let newSalary;

      newSalary = {
        BasicSalary: req.body.BasicSalary,
        BankName: req.body.BankName,
        AccountNo: req.body.AccountNo,
        AccountHolderName: req.body.AccountHolderName,
        IFSCcode: req.body.IFSCcode,
        TaxDeduction: req.body.TaxDeduction
      };

      SalarySchema.findByIdAndUpdate(req.params.id, newSalary, function (err, salary) {
        if (err) {
          res.send("error");
        } else {
          res.send(newSalary);
        }
      });
    }

    console.log("put");
    console.log(req.body);
  });
}

exports.deleteSalary=async(req,res)=>{
  EmployeeSchema.findById({ _id: req.params.id }, function (err, employee) {
    console.log("uuuuuuuunnnnnnnnnnnnnnndef", employee.salary[0]);
    if (err) {
      res.send("error");
      console.log(err);
    } else {
      SalarySchema.findByIdAndRemove({ _id: employee.salary[0] }, function (
        err,
        salary
      ) {
        if (!err) {
          console.log("salary deleted");
          EmployeeSchema.update(
            { _id: req.params.id },
            { $pull: { salary: employee.salary[0] } },
            function (err, numberAffected) {
              console.log(numberAffected);
              res.send(salary);
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

