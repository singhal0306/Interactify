const {createPool} = require("mysql")
const path = require("path")
const dotenv = require("dotenv")

dotenv.config({path: path.resolve(__dirname,"../.env")});

const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: process.env.DB_LIMIT
})

pool.getConnection((err)=>{
    if(err) console.log(err);
    else console.log("Database Connected!")
})

module.exports = pool;