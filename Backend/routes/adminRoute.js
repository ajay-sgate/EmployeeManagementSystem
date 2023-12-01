const express = require("express");
const db = require("../utils/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const adminRouter = express.Router();

adminRouter.post('/adminregister', (req, res) => {
    const sql = "INSERT INTO admin ( `name`,`email`, `password`) VALUES (?,?,?)";
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(400).json({ Status: false, Error: "Query / Hashing Error" })
        }
        db.query(sql, [req.body.name, req.body.email, hash], (err, result) => {
            if (err) {
                return res.status(400).json({ Status: false, Error: "Query Error" })
            }
            return res.status(200).json({ Status: true })
        })
    })
})

adminRouter.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: "admin", email: email, id: result[0].id },
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
    const sql = `SELECT e.id, e.name, e.email, e.salary, e.address, e.image, c.name as role 
                 FROM employee as e
                 INNER JOIN category as c
                 ON e.category_id = c.id`;

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
    return res.json({ Status: true })
})


adminRouter.delete('/delete_admin/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM admin WHERE id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error" })
        }

        return res.json({ Status: true, result: result })
    })
})

adminRouter.put('/edit_admin/:id', (req, res) => {
    const {id} = req.params;
    const sql = "UPDATE admin SET name = ?, email = ? WHERE id = ?";
    db.query(sql, [req.body.name, req.body.email, id], (err, result) => {
        if (err) {
            return res.status(400).json({ Status: false, Error: "Query Error" })
        }
        return res.status(200).json({ Status: true, result: result })
    })
})

adminRouter.get('/admin/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM admin WHERE id = ?';

    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false });
        return res.json(result)
    })
})

module.exports = { adminRouter }