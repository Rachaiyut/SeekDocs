const db = require("../models/index.js");
const UserProjectSubfield = db.userProjectSubfield;

exports.addProjectToSubfield = async (req, res) => {
    try {
        const subfieldIds = req.body.subfield_id;
        const projectId = req.body.project_id;
        const userId = req.body.user_id;  

        console.log(subfieldIds);
       
        for (let i = 0; i < subfieldIds.length; i++) {
            const projectSubfield = {
                user_id: userId,
                project_id: projectId,
                subfield_id: subfieldIds[i].subfield_id
            };
 
            await UserProjectSubfield.create(projectSubfield);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

exports.showSubfield = async (req, res) => {
    try {
        const subfield = await UserProjectSubfield.findAll({
            where: {
                project_id: req.params.project_id
            }
        });
        res.json(subfield);
        if (req.method === 'GET') {
            console.log(subfield);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}

exports.deleteProjectSubfield = async (req, res) => {
    const id = req.params.project_id;

    await UserProjectSubfield.destroy({
        where: { project_id: parseInt(id) }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Project was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Project with id=" + id
            });
        });
}
