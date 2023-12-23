const pool = require("../src/mysql");
const bcrypt = require("bcryptjs");

exports.register = (req, res) => {
    const { first_name, last_name, email, password, password_confirmation, day, month, year, gender} = req.body;

    pool.query("select email from users where email = ?", [email], async (err, result) => {
        if (err) {
            console.log(err);
        }
        else if (result && result.length > 0) {
            return res.render('register', {
                message: "Email is already in use."
            })
        }
        else if (password !== password_confirmation) {
            return res.render("register", {
                message: "Password do not match."
            })
        }

        let dob = year + "-" + month + "-" + day;
            let hashedPassword = await bcrypt.hash(password, 8);
        // console.log(hashedPassword);

        pool.query("INSERT INTO USERS SET ?", { first_name: first_name, last_name: last_name, email: email, password: hashedPassword, birthdate: dob, gender: gender }, (err, result, field) => {
            if (err) {
                console.log(err);
            }
            else {
                // console.log(result)
                res.redirect("/login")
            }
        })
    })
}


// first_name: 'Suryansn',
//   last_name: 'dfad',
//   email: 'daff@af.com',
//   password: 'dsaf23',
//   password_confirmation: 'asd',
//   day: '1',
//   month: '1',
//   year: '2000',
//   gender: 'Male',
//   marketing_accept: 'on'