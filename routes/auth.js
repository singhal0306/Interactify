const express = require("express");
const router = express.Router();

const authcontroller = require("../controllers/login")
const signupcontroller = require("../controllers/register")
const logoutcontroller = require("../controllers/logout")

router.post("/login", authcontroller.login)
router.post('/register', signupcontroller.register)
router.get("/logout", logoutcontroller.logout)

module.exports = router;


