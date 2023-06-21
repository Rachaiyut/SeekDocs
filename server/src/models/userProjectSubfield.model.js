module.exports = (sequelize, Sequelize) => {
    const userProjectSubfield = sequelize.define("user_project_subfield", {
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
        subfield_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                tableName: 'subfield',
                key: 'subfield_id'
            }
        }
    },{
        tableName: "user_project_subfield",
        timestamps: false
    });
    return userProjectSubfield;
};