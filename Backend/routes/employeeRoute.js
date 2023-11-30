const express = require("express");
const db = require("../utils/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const employeeRouter = express.Router();

employeeRouter.post("/employee_login", (req, res) => {
    const sql = "SELECT * from employee Where email = ?";
    db.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: "employee", email: email, id: result[0].id },
                        "sGate_jwt_secret_key",
                        { expiresIn: "1d" }
                    );
                    res.cookie('token', token)
                    return res.json({ loginStatus: true, id: result[0].id });
                }
            })

        } else {
            return res.json({ loginStatus: false, Error: "wrong email or password" });
        }
    });
});


employeeRouter.get('/detail/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM employee WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false });
        return res.json(result)
    })
})


employeeRouter.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

module.exports = { employeeRouter }