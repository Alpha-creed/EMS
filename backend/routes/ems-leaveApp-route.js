const express = require("express")

const router = express.Router()

const { getHrLeaveApplication, updateHrLeaveApplication, deleteHrLeaveApplication } = require("../controllers/ems-leaveApplication")
const { getEmpLeaveApplication, addEmpLeaveApplication, updateEmpLeaveApplication, deleteEmpLeaveApplication } = require("../controllers/ems-leaveApplication")

router.get("/get-leave-application-emp/:id",getEmpLeaveApplication)
      .post("/add-leave-application-emp/:id",addEmpLeaveApplication)
      .put("/update-leave-application-emp/:id",updateEmpLeaveApplication)
      .delete("/leave-application-emp/:id/:id2",deleteEmpLeaveApplication)

router.get("/get-leave-application-hr",getHrLeaveApplication)
      .put("/update-leave-application-hr/:id",updateHrLeaveApplication)
      .delete("/delete-leave-application-hr/:id/:id2",deleteHrLeaveApplication)

module.exports = router       