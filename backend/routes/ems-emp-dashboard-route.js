const express = require("express")

const router = express.Router()

const { getEmpWorkExp, addEmpWorkExp, deleteEmpWorkExp, updateEmpWorkExp }  =require("../controllers/ems-emp-dashboard")
const { getEmpFamilyInfo, addEmpFamilyInfo, updateEmpFamilyInfo, deleteEmpFamilyInfo }  =require("../controllers/ems-emp-dashboard")
const { getEmpEducation, addEmpEducation, updateEmpEducation, deleteEmpEducation }  =require("../controllers/ems-emp-dashboard")
const { getEmpPersonalInfo, updateEmpPersonalInfo }  =require("../controllers/ems-emp-dashboard")
const verifyEmployee = require("../middleware/verifyEmp")
const { verifyHREmployee } = require("../middleware/verifyHr")


router.get("/get-personal-info/:id",verifyHREmployee,getEmpPersonalInfo)
      .put("/update-personal-info/:id",verifyEmployee,updateEmpPersonalInfo)


router.get("/get-education/:id",verifyEmployee,getEmpEducation)
      .post("/add-education/:id",verifyEmployee,addEmpEducation)
      .put("/update-education/:id",verifyEmployee,updateEmpEducation)
      .delete("/delete-education/:id/:id2",verifyEmployee,deleteEmpEducation)

router.get("/get-family-info/:id",verifyHREmployee,getEmpFamilyInfo)
      .post("/add-family-info/:id",verifyEmployee,addEmpFamilyInfo)
      .put("/update-family-info/:id",verifyEmployee,updateEmpFamilyInfo)
      .delete("/delete-family-info/:id/:id2",verifyEmployee,deleteEmpFamilyInfo)

router.get("/get-work-experience/:id",verifyEmployee,getEmpWorkExp)
      .post("/add-work-experience/:id",verifyEmployee,addEmpWorkExp)
      .put("/update-work-experience/:id",verifyEmployee,updateEmpWorkExp)
      .delete("/delete-work-experience/:id/:id2",verifyEmployee,deleteEmpWorkExp)

module.exports = router 