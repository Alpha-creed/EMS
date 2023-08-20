const express = require("express")

const router = express.Router()

const { getCompany, addCompany, updateCompany } = require("../controllers/ems-hr")
const { getCity, addCity, updateCity, deleteCity } = require("../controllers/ems-hr")
const { getState, addState, updateState, deleteState } = require("../controllers/ems-hr")
const { getCountry, addCountry, updateCountry, deleteCountry } = require("../controllers/ems-hr")

router.get("/get-country",getCountry)
      .post("/add-country",addCountry)
      .put("/update-country/:id",updateCountry)
      .delete("/delete-country/:id",deleteCountry)

router.get("/get-state",getState)
      .post("/add-state",addState)
      .put("/update-state/:id",updateState)
      .delete("/delete-state/:id",deleteState)

router.get("/get-city",getCity)
      .post("/add-city",addCity)
      .put("/update-city/:id",updateCity)
      .delete("/delete-city/:id",deleteCity)

router.get("/get-company",getCompany)
      .post("/add-company",addCompany)
      .put("/update-company/:id",updateCompany)


module.exports = router 