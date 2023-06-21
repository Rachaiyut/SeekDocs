const db = require("../models/index");
const Project = db.project;

exports.checkDuplicateProjectName = (req, res, next) => { 
    // Project
    Project.findOne({
        where: {
            project_name: req.body.project_name
        }
    }).then(respone => { 
        if (respone) {
            res.status(400).send({
                message: `Failed! ${respone.dataValues.project_name} is already in database`
            });
            return;
        }
        next();
    });
};
 