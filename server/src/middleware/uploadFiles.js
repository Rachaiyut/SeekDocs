const db = require("../models/index");
const multer = require("multer");
const ProjectFiles = db.ProjectFiles;

// Set maximum file size limit (e.g., 5MB)
const maxFileSize = 5 * 1024 * 1024;

const fileFilter = (req, file, cb) => {
    try {
        // Check file type
        const fileTypeInfo = (file.mimetype);
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
        if (!file.mimetype || !allowedTypes.includes(fileTypeInfo)) {
            throw new Error('Invalid file type. Only PDF, PNG, JPG, and JPEG files are allowed.');
        }

        const fileSizeLimit = parseInt(req.headers['content-length']);

        // Check file size
        if (fileSizeLimit > maxFileSize) {
            throw new Error('File size exceeds the allowed limit.');
        }
        cb(null, true);
    } catch (error) {
        cb(error, false);
    }
};

const fileSizeLimit = (req, file, cb) => {
    try {
        const fileSizeLimit = parseInt(req.headers['content-length']);

        // Check file size
        if (fileSizeLimit > maxFileSize) {
            throw new Error('File size exceeds the allowed limit.');
        }

        cb(null, true); // Pass null as the error parameter to indicate success
    } catch (error) {
        cb(error, false); // Pass the error parameter to indicate failure
    }
};


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./resources/static/assets/uploads/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-project-" + Math.round(Math.random() * 1E9);
        const fileName = `${uniqueSuffix}-${file.originalname}`;
        cb(null, fileName);
    },
});

let uploadFile = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: fileSizeLimit
    }
});

module.exports = uploadFile;









