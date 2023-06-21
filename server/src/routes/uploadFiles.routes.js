const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin } = require("../middleware/authJwt");
const uploadController = require("../controllers/uploadFiles.controller");
const upload = require("../middleware/uploadFiles");

router.post("/project/fileUpload", verifyToken, isAdmin, upload.single("file"), uploadController.uploadFiles);
router.delete("/project/deleteProjectFile/:project_id", verifyToken, isAdmin, uploadController.deleteFile);

module.exports = router;