const path = require("path");
const dotenv = require("dotenv");

const envPath = path.resolve(__dirname, "..", ".env");
dotenv.config({ path: envPath });

console.log("✅ Variables de entorno cargadas desde:", envPath);
console.log("🔑 DB_HOST:", process.env.DB_HOST);
console.log("🔑 DB_NAME:", process.env.DB_NAME);
console.log("🔑 DB_USER:", process.env.DB_USER);

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: false,               
        trustServerCertificate: true, // Para evitar error con certificado
      },
    },
    logging: false,
  }
);

const Region = require("./region")(sequelize, DataTypes);
const Tipo = require("./tipo")(sequelize, DataTypes);
const Pokemon = require("./pokemon")(sequelize, DataTypes);

// Relaciones
Region.hasMany(Pokemon);
Pokemon.belongsTo(Region);

Tipo.hasMany(Pokemon);
Pokemon.belongsTo(Tipo);

module.exports = {
  sequelize,
  Sequelize,
  Region,
  Tipo,
  Pokemon,
};
