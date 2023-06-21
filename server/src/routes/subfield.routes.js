const express = require("express");
const router = express.Router();
const { retriveSubfield } = require("../controllers/subfield.controller");
const { verifyToken, isAdmin } = require("../middleware/authJwt");

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/subfield/all", verifyToken, isAdmin, retriveSubfield);
// router.post("/subfield/create", checkDuplicateSubjectName, verifyToken, isAdmin,  create);

module.exports = router;  