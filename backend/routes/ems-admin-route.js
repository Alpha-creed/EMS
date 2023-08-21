const express = require("express")

const router = express.Router()

const{addAdminPortal, getAdminPortal, updateAdminPortal, deleteAdminPortal}= require('../controllers/ems-admin')
const{ addAdminProjectBid, getAdminProjectBid, updateAdminProjectBid,deleteAdminProjectBid}= require('../controllers/ems-admin')
const verifyAdmin = require("../middleware/verifyAdmin")

//route for admin portal
router.post("/admin/add-portal",verifyAdmin,addAdminPortal)
      .get("/admin/get-portal",verifyAdmin,getAdminPortal)
      .put("/admin/update-portal/:id",verifyAdmin,updateAdminPortal)
      .delete("/admin/delete-portal/:id",verifyAdmin,deleteAdminPortal)


//route for admin project bid
router.post("/admin/add-project-bid",verifyAdmin,addAdminProjectBid)
      .get("/admin/get-project-bid",verifyAdmin,getAdminProjectBid)
      .put("/admin/update-project-bid/:id",verifyAdmin,updateAdminProjectBid)
      .delete("/admin/delete-project-bid/:id",verifyAdmin,deleteAdminProjectBid)

module.exports = router 