const express = require("express")

const router = express.Router()

const{addAdminPortal, getAdminPortal, updateAdminPortal, deleteAdminPortal}= require('../controllers/ems-admin')
const{ addAdminProjectBid, getAdminProjectBid, updateAdminProjectBid,deleteAdminProjectBid}= require('../controllers/ems-admin')

//route for admin portal
router.post("/admin/add-portal",addAdminPortal)
      .get("/admin/get-portal",getAdminPortal)
      .put("/admin/update-portal/:id",updateAdminPortal)
      .delete("/admin/delete-portal/:id",deleteAdminPortal)


//route for admin project bid
router.post("/admin/add-project-bid",addAdminProjectBid)
      .get("/admin/get-project-bid",getAdminProjectBid)
      .put("/admin/update-project-bid/:id",updateAdminProjectBid)
      .delete("/admin/delete-project-bid/:id",deleteAdminProjectBid)

module.exports = router 