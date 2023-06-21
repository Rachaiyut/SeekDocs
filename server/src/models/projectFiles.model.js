module.exports = (sequelize, Sequelize) => {
    const Project_Files = sequelize.define("project", {
        file_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: Sequelize.STRING(15),
            allowNull: false,
        },
        name: {
            type: Sequelize.STRING(30),
            allowNull: false
        },
        data: {
            type: Sequelize.BLOB('long'),
            allowNull: true,
        },
        project_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'project',
              key: 'project_id',
            },
        },
        create_at: {
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
        tableName: "project_files",
        timestamps: false
    });
    return Project_Files;
};
