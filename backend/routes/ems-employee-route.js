const express = require("express")

const router = express.Router()

const { getSalary, addSalary,updateSalary, deleteSalary }=require("../controllers/ems-employee")
const { getEmployee, addEmployee, updateEmployee, deleteEmployee }=require("../controllers/ems-employee")
const { getDepartment, addDepartment, updateDepartment, deleteDepartment }=require("../controllers/ems-employee")
const { getPosition, addPosition, updatePosition ,deletePosition}=require("../controllers/ems-employee")
const { getRole, addRole, updateRole, deleteRole }=require("../controllers/ems-employee")
const {verifyAdminHR, verifyHREmployee, verifyHR} = require("../middleware/verifyHr")

router.get("/get-role",verifyAdminHR,getRole)
      .post("/add-role",verifyAdminHR,addRole)
      .put("/update-role/:id",verifyAdminHR,updateRole)
      .delete("/delete-role/:id",verifyAdminHR,deleteRole)

router.get("/get-position",verifyAdminHR,getPosition)
      .post("/add-position",verifyAdminHR,addPosition)
      .put("/update-position/:id",verifyAdminHR,updatePosition)
      .delete("/delete-position/:id",verifyAdminHR,deletePosition)

router.get("/get-department",verifyAdminHR,getDepartment)
      .post("/add-department",verifyAdminHR,addDepartment)
      .put("/update-department/:id",verifyAdminHR,updateDepartment)
      .delete("/delete-department/:id",verifyAdminHR,deleteDepartment)      

router.get("/get-employee",verifyHR,getEmployee)
      .post("/add-employee",verifyHR,addEmployee)
      .put("/update-employee/:id",verifyHR,updateEmployee)
      .delete("/delete-employee/:id",verifyHR,deleteEmployee)

router.get("/get-salary",verifyHR,getSalary)
      .post("/add-salary/:id",verifyHR,addSalary)
      .put("/update-salary/:id",verifyHR,updateSalary)
      .delete("/delete-salary/:id",verifyHR,deleteSalary)

module.exports = router 