const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;

//verify token
exports.verifyToken = async (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    await jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            }); 
        }
        req.user = decoded; 
        next();
    }); 
};

//check admin role 
exports.isAdmin = async (req, res, next) => {
    await User.findOne({ 
        where: {
            email: req.user.email,
            role: "admin"    
        }}) 
        .then(user => {
            if (user && user.role === "admin") {
                next();
            } else {
                res.status(403).send({ message: "Require Admin Role!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

//check member role
exports.member = (req, res) => {
    User.findOne({ 
        where: {
            email: req.user.email,
            role: "member"    
        }}) 
        .then(user => {
            if (user && user.role === "member") {
                next();
            } else {
                res.status(403).send({ message: "Require Member Role!" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
}

