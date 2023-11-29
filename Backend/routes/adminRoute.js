const express = require("express");
const db = require("../utils/db");
const jwt = require("jsonwebtoken");

const adminRouter = express.Router();

adminRouter.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    db.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) {
            return res.status(400).json({ loginStatus: false, Error: "Query Error" })
        };
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email },
                "sGate_jwt_secret_key",
                { expiresIn: "1d" }
            );
            res.cookie('token', token)
            return res.status(200).json({ loginStatus: true });
        } else {
            return res.status(400).json({ loginStatus: false, Error: "Wrong Credentials!!" })
        }
    })
})

adminRouter.post('/add_category', (req, res) => {
    const sql = 'INSERT INTO category (`name`) VALUES (?)';
    db.query(sql, [req.body.category], (err, result) => {
        if (err) {
            return res.status(400).json({ Status: false, Error: "Query Error" })
        }
        return res.status(200).json({ Status: true })
    })
})


adminRouter.get('/category',(req,res)=>{
    const sql = 'SELECT * FROM category';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(400).json({ Status: false, Error: "Query Error" })
        }
        return res.status(200).json({ Status: true , result:result})
    })
})

module.exports = { adminRouter }