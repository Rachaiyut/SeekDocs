const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authJwt");
const { allAccess, userBoard, adminBoard } = require("../controllers/user.controller")

router.use((req, res, next) => {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.get("/test/all", allAccess);

router.get("/test/user", verifyToken, userBoard); 

router.get("/test/admin", verifyToken, isAdmin, adminBoard);

module.exports = router;  