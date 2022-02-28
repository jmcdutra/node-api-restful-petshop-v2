const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "dutra",
    password: "admin",
    database: "agenda-petshop",
})

module.exports = connection