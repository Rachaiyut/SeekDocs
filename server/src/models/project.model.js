module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project", {
        project_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        project_name: {
            type: Sequelize.STRING(80),
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'user_id',
            },
        },
        description_project: {
            type: Sequelize.STRING(60),
        },
        author: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        language: {
            type: Sequelize.CHAR(3),
            allowNull: false,
        },
        status: {
            type: Sequelize.STRING(3),
        },
        created_at: {
            type: Sequelize.DATE, 
            defaultValue: Sequelize.NOW,
            allowNull: false,
        },
        update_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            allowNull: false,
        },
    },{
        tableName: "project",
        timestamps: false
    });
    return Project;
};
