const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodebackend"
});


db.connect((err) => {
    if (err) {
        console.log("Connection Error", err)
    } else {
        console.log("Connected to the Database")
    }
})

module.exports = db;