const express = require("express");
const router = express.Router();
const { showSubfield, addProjectToSubfield, deleteProjectSubfield} = require("../controllers/userProjectSubfield.controller");
const { verifyToken, isAdmin } = require("../middleware/authJwt");

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
 
router.post("/addProjectSubfield/create", verifyToken, isAdmin, addProjectToSubfield);
router.get("/project/showSubfield/:project_id", verifyToken, isAdmin, showSubfield);
router.delete("/ProjectSubfield/delete/:project_id", verifyToken, isAdmin, deleteProjectSubfield);

module.exports = router;     