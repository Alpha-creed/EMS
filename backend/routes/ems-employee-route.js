const express = require("express")

const router = express.Router()

const { getSalary, addSalary,updateSalary, deleteSalary }=require("../controllers/ems-employee")
const { getEmployee, addEmployee, updateEmployee, deleteEmployee }=require("../controllers/ems-employee")
const { getDepartment, addDepartment, updateDepartment, deleteDepartment }=require("../controllers/ems-employee")
const { getPosition, addPosition, updatePosition ,deletePosition}=require("../controllers/ems-employee")
const { getRole, addRole, updateRole, deleteRole }=require("../controllers/ems-employee")


router.get("/get-role",getRole)
      .post("/add-role",addRole)
      .put("/update-role/:id",updateRole)
      .delete("/delete-role/:id",deleteRole)

router.get("/get-position",getPosition)
      .post("/add-position",addPosition)
      .put("/update-position/:id",updatePosition)
      .delete("/delete-position/:id",deletePosition)

router.get("/get-department",getDepartment)
      .post("/add-department",addDepartment)
      .put("/update-department/:id",updateDepartment)
      .delete("/delete-department/:id",deleteDepartment)      

router.get("/get-employee",getEmployee)
      .post("/add-employee",addEmployee)
      .put("/update-employee/:id",updateEmployee)
      .delete("/delete-employee/:id",deleteEmployee)

router.get("/get-salary",getSalary)
      .post("/add-salary/:id",addSalary)
      .put("/update-salary/:id",updateSalary)
      .delete("/delete-salary/:id",deleteSalary)

module.exports = router 