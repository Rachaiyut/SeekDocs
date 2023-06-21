const express = require("express");
const router = express.Router();
const { addProjectToSubject, deleteProject} = require("../controllers/userProjectSubject.controller");
const { verifyToken, isAdmin } = require("../middleware/authJwt");

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
 
router.post("/addProjectSubject/create", verifyToken, isAdmin, addProjectToSubject);
router.delete("/ProjectSubject/delete/:project_id", verifyToken, isAdmin, deleteProject);

module.exports = router;    