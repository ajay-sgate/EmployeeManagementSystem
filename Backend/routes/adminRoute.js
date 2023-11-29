const express = require("express");
const db = require("../utils/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

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


adminRouter.get('/category', (req, res) => {
    const sql = 'SELECT * FROM category';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(400).json({ Status: false, Error: "Query Error" })
        }
        return res.status(200).json({ Status: true, result: result })
    })
})

// Image Upload Start

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

// Image Upload End

adminRouter.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = 'INSERT INTO employee (`name`,`email`,`password`,`address`,`salary`,`image`,`category_id`) VALUES (?)';
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(400).json({ Status: false, Error: "Query / Hashing Error" })
        }

        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary,
            req.file.filename,
            req.body.category_id,
        ]


        db.query(sql, [values], (err, result) => {
            if (err) {
                return res.status(400).json({ Status: false, Error: "Query Error" })
            }
            return res.status(200).json({ Status: true })
        })
    })
})



adminRouter.get('/employee', (req, res) => {
    const sql = 'SELECT * FROM employee';
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(400).json({ Status: false, Error: "Query Error" })
        }
        return res.status(200).json({ Status: true, result: result })
    })
})

adminRouter.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM employee WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(400).json({ Status: false, Error: "Query Error" })
        }
        return res.status(200).json({ Status: true, result: result })
    })
})


adminRouter.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "UPDATE employee SET name = ?, email = ?, salary = ?, address = ?, category_id = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id,
    ]
    db.query(sql, [...values, id], (err, result) => {
        if (err) {
            return res.status(400).json({ Status: false, Error: "Query Error" })
        }
        return res.status(200).json({ Status: true, result: result })
    })
})



adminRouter.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employee WHERE id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error" })
        }

        return res.json({ Status: true, result: result })
    })
})



adminRouter.get('/admin_count', (req, res) => {
    const sql = "SELECT COUNT(id) AS admin FROM admin";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error" })
        }
        return res.json({ Status: true, Result: result })
    })
})

adminRouter.get('/employee_count', (req, res) => {
    const sql = "SELECT COUNT(id) AS employee FROM employee";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error" })
        }
        return res.json({ Status: true, Result: result })
    })
})

adminRouter.get('/salary_count', (req, res) => {
    const sql = "SELECT SUM(salary) AS salaryOFEmp FROM employee";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error" })
        }
        return res.json({ Status: true, Result: result })
    })
})

adminRouter.get('/admin_records', (req, res) => {
    const sql = "SELECT * FROM admin"
    db.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

adminRouter.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})


module.exports = { adminRouter }