const express = require("express")
const { LoginUser } = require("../controllers/ems-logins")

const router = express.Router()

router.post("/login",LoginUser)

module.exports = router 