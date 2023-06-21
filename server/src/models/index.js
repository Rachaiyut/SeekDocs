const config = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    dialect: config.dialect,
    host: config.HOST,
    username: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    legacyAliases: false
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, Sequelize);
db.project = require("./project.model")(sequelize, Sequelize)
db.subject = require("./subject.model")(sequelize, Sequelize)
db.subfield = require("./subfield.model")(sequelize, Sequelize)
db.userProjectSubject = require("./userProjectSubject.model")(sequelize, Sequelize)
db.userProjectSubfield = require("./userProjectSubfield.model")(sequelize, Sequelize)
db.ProjectFiles = require("./projectFiles.model")(sequelize, Sequelize)

//user_proejct_subject Table 
db.userProjectSubject.belongsTo(db.user, {
    through: "user_project_subject",
    as: "users",
    foreignKey: "user_id",
})

db.userProjectSubject.belongsTo(db.project, {
    through: "user_project_subject",
    as: "project",
    foreignKey: "project_id",
})

db.userProjectSubject.belongsTo(db.subject, {
    through: "user_project_subject",
    as: "subject",
    foreignKey: "subject_id",
})

//user_proejct_subfield table
db.userProjectSubfield.belongsTo(db.user, {
    through: "user_project_subfield",
    as: "users",
    foreignKey: "user_id"
})

db.userProjectSubfield.belongsTo(db.project, {
    through: "user_project_subfield",
    as: "project",
    foreignKey: "project_id",
})

db.userProjectSubfield.belongsTo(db.subfield, {
    through: "user_project_subfield",
    as: "subfield",
    foreignKey: "subfield_id",
})

module.exports = db;   