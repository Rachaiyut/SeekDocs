const express = require("express");
const router = express.Router();
const { create, showProject, showAllProjects, deleteProject } = require("../controllers/project.controller");
const { verifyToken, isAdmin } = require("../middleware/authJwt");
const { checkDuplicateProjectName } = require("../middleware/verifyProject");

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
 
router.post("/project/create", checkDuplicateProjectName, verifyToken, isAdmin,  create);
router.get("/project/showAllProjects", verifyToken, isAdmin, showAllProjects);
router.get("/project/showProject/:project_id", verifyToken, isAdmin, showProject)
router.delete("/project/deleteProject/:project_id", verifyToken, isAdmin, deleteProject);
router.get("/test/project/showAllProjects", showAllProjects);

module.exports = router;    