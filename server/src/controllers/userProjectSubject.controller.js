const db = require("../models/index.js");
const UserProjectSubject = db.userProjectSubject;

exports.addProjectToSubject = async (req, res) => {
    try {
        const subjectIds = req.body.subject_id;
        const projectId = req.body.project_id;
        const userId = req.body.user_id;


        for (let i = 0; i < subjectIds.length; i++) {  
            const projectSubject = {
                user_id: userId,
                project_id: projectId,
                subject_id: subjectIds[i].subject_id
            };

            console.log(projectSubject);

            await UserProjectSubject.create(projectSubject);
        }
 
        res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
}
 
exports.deleteProject = async (req, res) => {
    const id = req.params.project_id;

    await UserProjectSubject.destroy({
        where: { project_id: parseInt(id) }
    })
        .then(num => {
            if (num == 1) {
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
