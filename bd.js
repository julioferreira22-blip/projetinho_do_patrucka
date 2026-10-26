//npm i mysql2
const mysql2 = require("mysql2/promise")



const pool = mysql.creatPool({
host: "127.0.0.1", 
port: 3306,
user: "root",
password: "escola", //nos pcs da escola, senha "escola"
database: "patrick2bsb2"
})

module.exports = Object.freeze({
    pool: pool
    
})