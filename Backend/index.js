const express = require("express")
const cors = require("cors");
const { adminRouter } = require("./routes/adminRoute");
const { employeeRouter } = require("./routes/employeeRoute");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser")
const app = express();


app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(express.static('Public'))
app.use('/auth', adminRouter)
app.use('/employee', employeeRouter)

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, "sGate_jwt_secret_key", (err, decoded) => {
            if (err) return res.json({ Status: false, Error: "Wrong Token" })
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    } else {
        return res.json({ Status: false, Error: "Not autheticated" })
    }
}

app.get('/verify', verifyUser, (req, res) => {
    return res.json({ Status: true, role: req.role, id: req.id })
})

app.listen(8080, () => {
    console.log(`Server is running on port 8080.`)
})