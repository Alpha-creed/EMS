const express = require("express")

const router = express.Router()

const{addAdminPortal, getAdminPortal, updateAdminPortal, deleteAdminPortal}= require('../controllers/ems-admin')
const{ addAdminProjectBid, getAdminProjectBid, updateAdminProjectBid,deleteAdminProjectBid}= require('../controllers/ems-admin')

//route for admin portal
router.post("/api/admin/add-portal",addAdminPortal)
      .get("/api/admin/get-portal",getAdminPortal)
      .put("/api/admin/update-portal/:id",updateAdminPortal)
      .delete("/api/admin/delete-portal/:id",deleteAdminPortal)


//route for admin project bid
router.post("/api/admin/add-project-bid",addAdminProjectBid)
      .get("/api/admin/get-project-bid",getAdminProjectBid)
      .put("/api/admin/update-project-bid/:id",updateAdminProjectBid)
      .delete("/api/admin/delete-project-bid/:id",deleteAdminProjectBid)