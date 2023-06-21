module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define("subject", {
      subject_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      subject_name: {
        type: Sequelize.STRING,
        allowNull: false
      }
      },{
        tableName: 'subject',
        timestamps: false
    });
  return Subject;
};
