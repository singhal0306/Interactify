const express = require("express");
const cookieParser =require("cookie-parser");

const dotenv = require("dotenv")
dotenv.config({path: "./.env"});
const port = process.env.PORT || 8000

const app = express();

app.set("view engine", "hbs")
app.set("views", "./templates")

app.use(cookieParser())
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static("./public"));
app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth")); 

app.listen(port, (err)=>{
    if(err) console.log(err);
    console.log(`Server is running on port: ${port}`)
})