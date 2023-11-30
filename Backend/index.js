const express = require("express")
const cors = require("cors");
const { adminRouter } = require("./routes/adminRoute");
const { employeeRouter } = require("./routes/employeeRoute");

const app = express();

app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use(express.static('Public'))
app.use('/auth', adminRouter)
app.use('/employee', employeeRouter)

app.listen(8080, () => {
    console.log(`Server is running on port 8080.`)
})