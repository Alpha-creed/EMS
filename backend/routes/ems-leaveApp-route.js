const express = require("express")

const router = express.Router()

const { getHrLeaveApplication, updateHrLeaveApplication, deleteHrLeaveApplication } = require("../controllers/ems-leaveApplication")
const { getEmpLeaveApplication, addEmpLeaveApplication, updateEmpLeaveApplication, deleteEmpLeaveApplication } = require("../controllers/ems-leaveApplication")
const verifyEmployee = require("../middleware/verifyEmp")
const { verifyHR } = require("../middleware/verifyHr")

router.get("/get-leave-application-emp/:id",verifyEmployee,getEmpLeaveApplication)
      .post("/add-leave-application-emp/:id",verifyEmployee,addEmpLeaveApplication)
      .put("/update-leave-application-emp/:id",verifyEmployee,updateEmpLeaveApplication)
      .delete("/leave-application-emp/:id/:id2",verifyEmployee,deleteEmpLeaveApplication)

router.get("/get-leave-application-hr",verifyHR,getHrLeaveApplication)
      .put("/update-leave-application-hr/:id",verifyHR,updateHrLeaveApplication)
      .delete("/delete-leave-application-hr/:id/:id2",verifyHR,deleteHrLeaveApplication)

module.exports = router        