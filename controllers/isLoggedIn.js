const jwt = require("jsonwebtoken");
const pool = require("../src/mysql");
const { promisify } = require("util");

exports.isLoggedIn = async (req, res, next) => {
    // console.log(req.cookies)
    if (req.cookies.jwt) {
        try {
            //1.) Verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);
            // console.log(decoded)

            //2.) Check if the user still exists
            pool.query("Select * from users where user_id = ?", [decoded.id], (error, result) => {
                if (error) {
                    console.log(error)
                }
                else {
                    if (!result) {
                        return next();
                    }
                    req.user = result[0]
                    return next()
                }
            })

        } catch (error) {
            console.log(error)
            return next()
        }
    } else {
        next();
    }
}