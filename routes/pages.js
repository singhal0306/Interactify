const express = require("express");
const isLoggedInController = require("../controllers/isLoggedIn")
const router = express.Router();

router.get('/', isLoggedInController.isLoggedIn ,(req, res) =>{
    if (req.user) {
        res.render("home", {
            user: req.user
        });
    } else {
        res.redirect("/login");
    }
})

router.get('/login',(req, res)=>{
    res.render("login")
})

router.get('/register', (req, res) =>{
    res.render("register");
})

router.get('/home', isLoggedInController.isLoggedIn ,(req, res) =>{

    if (req.user) {
        res.render("home", {
            user: req.user
        });
    } else {
        res.redirect("/login");
    }
})

router.get('/profile', isLoggedInController.isLoggedIn, (req, res)=>{
    if (req.user) {
        res.render("profile", {
            user: req.user
        });
    } else {
        res.redirect("/login");
    }
})

router.get("/error", (req, res)=>{
    res.render("error");
})

router.post("/error", (req, res)=>{
    res.render("error");
})

module.exports = router;