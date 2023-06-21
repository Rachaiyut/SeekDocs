const express = require("express");
const router = express.Router();
const { retriveSubject,  create} = require("../controllers/subject.controller");
const { verifyToken, isAdmin } = require("../middleware/authJwt");
const { checkDuplicateSubjectName } = require("../middleware/verifySubject");

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
 
router.get("/subject/all", verifyToken, isAdmin, retriveSubject);
router.post("/subject/create", checkDuplicateSubjectName, verifyToken, isAdmin,  create);

module.exports = router;   