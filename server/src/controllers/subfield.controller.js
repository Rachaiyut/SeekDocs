const db = require("../models/index.js");
const Subfield = db.subfield;

exports.retriveSubfield = async (req, res) => {
    await Subfield.findAll()
        .then(subfield => {
            res.json(subfield);
        })
        .catch(err => {
            res.status(500).send({
                message:
                  err.message || "Some error occurred while retrieving tutorials."
            });
        })
}
