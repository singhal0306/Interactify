const pool = require("../src/mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path= require('path');
const dotenv = require("dotenv")
dotenv.config({path: path.resolve(__dirname,"../.env")});

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: "Please provide an email and password"
            })
        }

        pool.query("select * from users where email = ?", [email], async (err, result) => {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(result)
                if (!result || !(await bcrypt.compare(password, result[0].password))) {
                    res.status(401).render("login", {
                        message: "Email or Password is incorrect."
                    })
                }

                const id = result[0].user_id;
                const token =  jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: ", token);

                const cookiesOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                    httpOnly: true
                }
                res.cookie('jwt', token, cookiesOptions);
                res.status(200).redirect("/home");
            }
        })
    } catch (error) {
        console.log(error);
    }
}