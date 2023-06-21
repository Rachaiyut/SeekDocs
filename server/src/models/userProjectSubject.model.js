module.exports = (sequelize, Sequelize) => {
    const userProjectSubject = sequelize.define("user_project_subject", {
        ups_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                tableName: 'users',
                key: 'user_id'
            }
        },
        project_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                tableName: 'project',
                key: 'project_id'
            }
        },
        subject_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                tableName: 'subject',
                key: 'subject_id'
            }
        }
    },{
        tableName: "user_project_subject",
        timestamps: false
    });
    return userProjectSubject;
};