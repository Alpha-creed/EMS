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

exports.getCountry = async(req,res)=>{
    CountrySchema.find()
    .populate({ path: "states", populate: { path: "cities" } })
    .exec(function (err, country) {
      res.send(country);
    });
}

exports.addCountry = async(req,res)=>{
    Joi.validate(req.body, CountryValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newCountry;
    
          newCountry = {
            CountryName: req.body.CountryName
          };
    
          CountrySchema.create(newCountry, function (err, country) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              res.send(country);
              console.log("new country Saved");
            }
          });
          console.log(req.body);
        }
      });
}

exports.updateCountry = async(req,res)=>{
    Joi.validate(req.body, CountryValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newCountry;
    
          newCountry = {
            CountryName: req.body.CountryName
          };
          CountrySchema.findByIdAndUpdate(req.params.id, newCountry, function (
            err,
            country
          ) {
            if (err) {
              res.send("error");
            } else {
              res.send(newCountry);
            }
          });
        }
    
        console.log("put");
        console.log(req.body);
      });
}

exports.deleteCountry = async(req,res)=>{
    CountrySchema.findById(req.params.id, function (err, foundCountry) {
        if (err) {
          res.send(err);
        } else {
          console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", foundCountry);
          if (!foundCountry.states.length == 0) {
            res
              .status(403)
              .send(
                "First Delete All The states in this country before deleting this country"
              );
          } else {
            CountrySchema.findByIdAndRemove({ _id: req.params.id }, function (
              err,
              country
            ) {
              if (!err) {
                StateSchema.deleteMany({ country: { _id: req.params.id } }, function (
                  err
                ) {
                  if (err) {
                    console.log(err);
                    res.send("error");
                  } else {
                    CitySchema.deleteMany(
                      { state: { country: { _id: req.params.id } } },
                      function (err) {
                        if (err) {
                          console.log(err);
                          res.send("error");
                        } else {
                          console.log(" Country deleted");
                          res.send(country);
                        }
                      }
                    );
                  }
                });
              } else {
                console.log(err);
                res.send("error");
              }
            });
          }
        }
      });
    
      console.log("delete");
      console.log(req.params.id);
    
}

exports.getState = async(req,res)=>{
    StateSchema.find()
    // .populate("country citiesx")remove x if necessary
    .populate(["country", "cities"])//if error use the other one
    .exec(function (err, country) {
      res.send(country);
    });
}

exports.addState = async(req,res)=>{
    Joi.validate(req.body, StateValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newState;
    
          newState = {
            StateName: req.body.StateName,
            country: req.body.CountryID
          };
    
          StateSchema.create(newState, function (err, state) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              CountrySchema.findById(req.body.CountryID, function (err, country) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  country.states.push(state);
                  country.save(function (err, data) {
                    if (err) {
                      console.log(err);
                      res.send("err");
                    } else {
                      console.log(data);
                      res.send(state);
                    }
                  });
                }
              });
              console.log("new country Saved");
            }
          });
          console.log(req.body);
        }
      });
    
}

exports.updateState = async(req,res)=>{
    Joi.validate(req.body, StateValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newState;
    
          newState = {
            StateName: req.body.StateName,
            country: req.body.CountryID
          };
    
          StateSchema.findByIdAndUpdate(req.params.id, newState, function (err, state) {
            if (err) {
              res.send("error");
            } else {
              res.send(newState);
            }
          });
        }
    
        console.log("put");
        console.log(req.body);
      });
}

exports.deleteState = async(req,res)=>{
    StateSchema.findById(req.params.id, function (err, foundState) {
        if (err) {
          res.send(err);
        } else {
          // console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk", foundCountry);
          if (!foundState.cities.length == 0) {
            res
              .status(403)
              .send(
                "First Delete All The cities in this state before deleting this state"
              );
          } else {
            State.findByIdAndRemove({ _id: req.params.id }, function (err, state) {
              if (!err) {
                console.log(" state deleted");
                console.log("country id---------", state.country[0]);
                Country.update(
                  { _id: state.country[0] },
                  { $pull: { states: state._id } },
                  function (err, numberAffected) {
                    console.log(numberAffected);
                    res.send(state);
                  }
                );
              } else {
                console.log(err);
                res.send("error");
              }
            });
          }
        }
      });
    
      console.log("delete");
      console.log(req.params.id);
    
}

exports.getCity = async(req,res)=>{
    CitySchema.find()
    .populate({ path: "state", populate: { path: "country" } })
    .exec(function (err, city) {
      // employee = employees;
      res.send(city);
    });
}

exports.addCity = async(req,res)=>{
    Joi.validate(req.body, CityValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newCity;
    
          newCity = {
            CityName: req.body.CityName,
            state: req.body.StateID
          };
    
          CitySchema.create(newCity, function (err, city) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              StateSchema.findById(req.body.StateID, function (err, state) {
                if (err) {
                  console.log(err);
                  res.send("err");
                } else {
                  state.cities.push(city);
                  state.save(function (err, data) {
                    if (err) {
                      console.log(err);
                      res.send("err");
                    } else {
                      console.log(data);
                      res.send(city);
                    }
                  });
                }
              });
    
              console.log("new city Saved");
            }
          });
          console.log(req.body);
        }
      });
}

exports.updateCity = async(req,res)=>{
    Joi.validate(req.body, CityValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newCity;
    
          newCity = {
            CityName: req.body.CityName,
            state: req.body.StateID
          };
    
          CitySchema.findByIdAndUpdate(req.params.id, newCity, function (err, city) {
            if (err) {
              res.send("error");
            } else {
              res.send(newCity);
            }
          });
        }
    
        console.log("put");
        console.log(req.body);
      });
}

exports.deleteCity = async(req,res)=>{
    CompanySchema.find({ city: req.params.id }, function (err, country) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          console.log(country.length == 0);
          if (country.length == 0) {
            CitySchema.findByIdAndRemove({ _id: req.params.id }, function (err, city) {
              if (!err) {
                console.log(" state deleted");
                StateSchema.update(
                  { _id: city.state[0] },
                  { $pull: { cities: city._id } },
                  function (err, numberAffected) {
                    console.log(numberAffected);
                    res.send(city);
                  }
                );
              } else {
                console.log(err);
                res.send("error");
              }
            });
          } else {
            res
              .status(403)
              .send(
                "This city is associated with company so you can not delete this"
              );
          }
        }
      });
    
      console.log("delete");
      console.log(req.params.id);
    
}

exports.getCompany = async(req,res)=>{
     // var employee = {};
  // {path: 'projects', populate: {path: 'portals'}}
  CompanySchema.find()
  // .populate({ path: "city", populate: { path: "state" } ,populate: { populate: { path: "country" } } })
  .populate({
    path: "city",
    populate: {
      path: "state",
      model: "State",
      populate: {
        path: "country",
        model: "Country"
      }
    }
  })
  .exec(function (err, compnay) {
    res.send(compnay);
  });
}

exports.addCompany = async(req,res)=>{
    Joi.validate(req.body, CompanyValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newCompany;
    
          newCompany = {
            CompanyName: req.body.CompanyName,
            Address: req.body.Address,
            city: req.body.CityID,
            PostalCode: req.body.PostalCode,
            Website: req.body.Website,
            Email: req.body.Email,
            ContactPerson: req.body.ContactPerson,
            ContactNo: req.body.ContactNo,
            FaxNo: req.body.FaxNo,
            PanNo: req.body.PanNo,
            GSTNo: req.body.GSTNo,
            CINNo: req.body.CINNo
          };
    
          CompanySchema.create(newCompany, function (err, company) {
            if (err) {
              console.log(err);
              res.send("error");
            } else {
              res.send(newCompany);
              console.log("new company Saved");
            }
          });
          console.log(req.body);
        }
      });
}


exports.updateCompany = async(req,res)=>{
    Joi.validate(req.body, CompanyValidation, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send(err.details[0].message);
        } else {
          let newCompany;
    
          newCompany = {
            CompanyName: req.body.CompanyName,
            Address: req.body.Address,
            city: req.body.CityID,
            PostalCode: req.body.PostalCode,
            Website: req.body.Website,
            Email: req.body.Email,
            ContactPerson: req.body.ContactPerson,
            ContactNo: req.body.ContactNo,
            FaxNo: req.body.FaxNo,
            PanNo: req.body.PanNo,
            GSTNo: req.body.GSTNo,
            CINNo: req.body.CINNo
          };
    
          CompanySchema.findByIdAndUpdate(req.params.id, newCompany, function (
            err,
            company
          ) {
            if (err) {
              res.send("error");
            } else {
              res.send(newCompany);
            }
          });
        }
    
        console.log("put");
        console.log(req.body);
      });
}
