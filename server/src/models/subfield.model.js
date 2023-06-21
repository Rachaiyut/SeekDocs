module.exports = (sequelize, Sequelize) => {
  const Subfield = sequelize.define(
    "subfield",
    {
      subfield_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subfield_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "subfield",
      timestamps: false,
    }
  );
  return Subfield;
};
