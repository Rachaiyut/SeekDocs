const fs = require("fs");
const path = require('path');

const db = require("../models/index.js");
const { get } = require("https");
const Project_Files = db.ProjectFiles;
const __basedir = path.resolve();

const uploadFiles = async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).send("You must select a file.");
		}

		const projectFile = await Project_Files.create({
			type: req.file.mimetype,
			name: req.file.originalname,
			data: fs.readFileSync(
				__basedir + "/resources/static/assets/uploads/" + req.file.filename
			),
			project_id: req.body.project_id
		});

		fs.writeFileSync(
			__basedir + "/resources/static/assets/tmp/" + projectFile.name,
			projectFile.data
		);

		return res.send("File has been uploaded.");
	} catch (error) {
		console.log(error);
		return res.status(500).send(`Error when trying to upload pdf: ${error}`);
	}
};

const deleteFile = async(req, res) => {
	try{
		const project_id = req.params.project_id;
		console.log(project_id);
		const check = Project_Files.destroy({
			where: {project_id: project_id}
		})
		if (check === 1) {
			res.send({
				message: "Tutorial was deleted successfully!"
			});
		} else {
			res.send({
				message: `Cannot delete Tutorial with id=${project_id}. Maybe Tutorial was not found!`
			});
		}
	} catch (error){
		res.status(500).send({
			message: "Could not delete Tutorial with id=" + project_id
		});
	}
}

module.exports = {
	uploadFiles,
	deleteFile
};