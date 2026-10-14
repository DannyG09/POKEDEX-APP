module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define("Region", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "Regions",
  });
  return Region;
};
