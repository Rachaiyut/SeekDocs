const db = require("../models/index");
const User = db.user;

exports.checkDuplicateUsernameOrEmail = (req, res, next) => {
    // email
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(respone => {
        if (respone) {
            res.status(400).send({
                message: "Failed! email is already in use!"
            });
            return;
        }
        next();
    });
};
 