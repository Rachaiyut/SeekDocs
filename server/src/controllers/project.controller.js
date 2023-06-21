const db = require("../models/index.js");
const Project = db.project;

// Create a Project
exports.create = async (req, res) => {
    const project = {
        project_name: req.body.project_name,
        user_id: req.body.user_id,
        description_project: req.body.description_project,
        author: req.body.author,
        language: req.body.language,
        status: req.body.status ? req.body.status : false
    };


    console.log(project);

    // Save Project in the database
    await Project.create(project)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Project."
            });
        });
}

// Show all data
exports.showAllProjects = async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.json(projects);
        if (req.method === 'GET') {
            console.log(projects);
        }
    } catch (error) { 
        console.error(error);
        res.status(500).send({ message: 'Failed to fetch project' });
    }
};

exports.showProject = async (req, res) => {
    try {
        const projects = await Project.findOne({
            where: {
                project_id: req.params.project_id
            }
        });
        res.json(projects);
        if (req.method === 'GET') {
            console.log(projects);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Failed to fetch project' });
    }
};

exports.deleteProject = async (req, res) => {
    const id = req.params.project_id;

    await Project.destroy({
        where: { project_id: parseInt(id) }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};