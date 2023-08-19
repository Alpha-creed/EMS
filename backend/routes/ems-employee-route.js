const express = require("express")

const router = express.Router()

const { getSalary, updateSalary, deleteSalary }=require("../controllers/ems-employee")
const { getEmployee, addEmployee, updateEmployee, deleteEmployee }=require("../controllers/ems-employee")
const { getDepartment, addDepartment, updateDepartment, deleteDepartment }=require("../controllers/ems-employee")
const { getPosition, addPosition, updatePosition ,deletePosition}=require("../controllers/ems-employee")
const { getRole, addRole, updateRole, deleteRole }=require("../controllers/ems-employee")


router.get("/api/get-role",getRole)
      .post("/api/add-role",addRole)
      .put("/api/update-role/:id",updateRole)
      .delete("/api/delete-role/:id",deleteRole)

router.get("/api/get-position",getPosition)
      .post("/api/add-position",addPosition)
      .put("/api/update-position/:id",updatePosition)
      .delete("/api/delete-position/:id",deletePosition)

router.get("/api/get-department",getDepartment)
      .post("/api/add-department",addDepartment)
      .put("/api/update-department/:id",updateDepartment)
      .delete("/api/delete-department/:id",deleteDepartment)      

router.get("/api/get-employee",getEmployee)
      .post("/api/add-employee",addEmployee)
      .put("/api/update-employee/:id",updateEmployee)
      .delete("/api/delete-employee/:id",deleteEmployee)

router.get("/api/get-salary",getSalary)
      .post("/api/add-salary/:id",addSalary)
      .put("/api/update-salary/:id",updateSalary)
      .delete("/api/delete-salary/:id",deleteSalary)