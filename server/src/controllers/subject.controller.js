const db = require("../models/index.js");
const Subject = db.subject;

exports.create = async(req, res) => {
    return await Subject.create({
        subject_name: req.body.subject_name
    })
        .then((req) => {
            console.log(">> Created Subject: " + JSON.stringify(req));
            res.json(req) 
        })
        .catch((err) => {
            console.log(">> Error while creating Subject: ", err);
        })
}

exports.retriveSubject = async (req, res) => {
    await Subject.findAll()
        .then(subject => {
            res.json(subject);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        })
}
