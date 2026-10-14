module.exports = (sequelize, DataTypes) => {
  const Pokemon = sequelize.define("Pokemon", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagen: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: "Pokemons",
  });
  return Pokemon;
};
