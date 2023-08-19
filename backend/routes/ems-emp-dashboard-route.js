const express = require("express")

const router = express.Router()

const { getEmpWorkExp, addEmpWorkExp, deleteEmpWorkExp }  =require("../controllers/ems-emp-dashboard")
const { getEmpFamilyInfo, addEmpFamilyInfo, updateEmpFamilyInfo, deleteEmpFamilyInfo }  =require("../controllers/ems-emp-dashboard")
const { getEmpEducation, addEmpEducation, updateEmpEducation, deleteEmpEducation }  =require("../controllers/ems-emp-dashboard")
const { getEmpPersonalInfo, updateEmpPersonalInfo }  =require("../controllers/ems-emp-dashboard")


router.get("/api/get-personal-info/:id",getEmpPersonalInfo)
      .put("/api/update-personal-info/:id",updateEmpPersonalInfo)


router.get("/api/get-education/:id",getEmpEducation)
      .post("/api/add-education/:id",addEmpEducation)
      .put("/api/update-education/:id",updateEmpEducation)
      .delete("/api/delete-education/:id/:id2",deleteEmpEducation)

router.get("/api/get-family-info/:id",getEmpFamilyInfo)
      .post("/api/add-family-info/:id",addEmpFamilyInfo)
      .put("/api/update-family-info/:id",updateEmpFamilyInfo)
      .delete("/api/delete-family-info/:id/:id2",deleteEmpFamilyInfo)

router.get("/api/get-work-experience/:id",getEmpWorkExp)
      .post("/api/add-work-experience/:id",addEmpWorkExp)
      .put("/api/update-work-experience/:id",updateEmpWorkExp)
      .delete("/api/delete-work-experience/:id/:id2",deleteEmpWorkExp)
