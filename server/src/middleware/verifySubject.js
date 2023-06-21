const db = require("../models/index");
const Subject = db.subject;

exports.checkDuplicateSubjectName = (req, res, next) => { 
    // subject
    Subject.findOne({
        where: {
            subject_name: req.body.subject_name
        }
    }).then(respone => { 
        if (respone) {
            res.status(400).send({
                message: `Failed! ${respone.dataValues.subject_name} is already in database`
            });
            return;
        }
        next();
    });
};
 