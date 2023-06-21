const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require('dotenv').config()
const db = require("./src/models/index");
const authRoute = require("./src/routes/auth.routes");
const userRoute = require("./src/routes/user.routes");
const subjectRoute = require("./src/routes/subject.routes")
const subfieldRoute = require("./src/routes/subfield.routes")
const projectRoute = require("./src/routes/project.routes")
const userProjectSubject = require("./src/routes/userProjectSubject.routes")
const userProjectSubfield = require("./src/routes/userprojectSubfield.routes")
const projectFiles = require("./src/routes/uploadFiles.routes")

const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json())
app.use(cors());


// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// db.sequelize.sync();

//route
app.use("/api", authRoute, userRoute, subjectRoute, subfieldRoute, projectRoute, userProjectSubject, userProjectSubfield, projectFiles); 

//set port 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});