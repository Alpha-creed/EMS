const express = require("express")

const router = express.Router()

const { getCompany, addCompany, updateCompany } = require("../controllers/ems-hr")
const { getCity, addCity, updateCity, deleteCity } = require("../controllers/ems-hr")
const { getState, addState, updateState, deleteState } = require("../controllers/ems-hr")
const { getCountry, addCountry, updateCountry, deleteCountry } = require("../controllers/ems-hr")
const { verifyHREmployee, verifyHR, verifyAdminHR } = require("../middleware/verifyHr")

router.get("/get-country",verifyHR,getCountry)
      .post("/add-country",verifyHR,addCountry)
      .put("/update-country/:id",verifyHR,updateCountry)
      .delete("/delete-country/:id",verifyHR,deleteCountry)

router.get("/get-state",verifyHR,getState)
      .post("/add-state",verifyHR,addState)
      .put("/update-state/:id",verifyHR,updateState)
      .delete("/delete-state/:id",verifyHR,deleteState)

router.get("/get-city",verifyHR,getCity)
      .post("/add-city",verifyHR,addCity)
      .put("/update-city/:id",verifyHR,updateCity)
      .delete("/delete-city/:id",verifyHR,deleteCity)

router.get("/get-company",verifyAdminHR,getCompany)
      .post("/add-company",verifyAdminHR,addCompany)
      .put("/update-company/:id",verifyAdminHR,updateCompany)


module.exports = router 