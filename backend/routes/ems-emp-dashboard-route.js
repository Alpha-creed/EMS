const express = require("express")

const router = express.Router()

const { getEmpWorkExp, addEmpWorkExp, deleteEmpWorkExp, updateEmpWorkExp }  =require("../controllers/ems-emp-dashboard")
const { getEmpFamilyInfo, addEmpFamilyInfo, updateEmpFamilyInfo, deleteEmpFamilyInfo }  =require("../controllers/ems-emp-dashboard")
const { getEmpEducation, addEmpEducation, updateEmpEducation, deleteEmpEducation }  =require("../controllers/ems-emp-dashboard")
const { getEmpPersonalInfo, updateEmpPersonalInfo }  =require("../controllers/ems-emp-dashboard")


router.get("/get-personal-info/:id",getEmpPersonalInfo)
      .put("/update-personal-info/:id",updateEmpPersonalInfo)


router.get("/get-education/:id",getEmpEducation)
      .post("/add-education/:id",addEmpEducation)
      .put("/update-education/:id",updateEmpEducation)
      .delete("/delete-education/:id/:id2",deleteEmpEducation)

router.get("/get-family-info/:id",getEmpFamilyInfo)
      .post("/add-family-info/:id",addEmpFamilyInfo)
      .put("/update-family-info/:id",updateEmpFamilyInfo)
      .delete("/delete-family-info/:id/:id2",deleteEmpFamilyInfo)

router.get("/get-work-experience/:id",getEmpWorkExp)
      .post("/add-work-experience/:id",addEmpWorkExp)
      .put("/update-work-experience/:id",updateEmpWorkExp)
      .delete("/delete-work-experience/:id/:id2",deleteEmpWorkExp)

module.exports = router 