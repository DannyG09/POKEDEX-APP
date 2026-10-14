const path = require("path");
const dotenv = require("dotenv");

// Definir entorno, por defecto "development"
const env = process.env.NODE_ENV || "development";

// Definir ruta del archivo .env
// Para development, carga ".env"
// Para otros entornos, carga ".env.<env>"
const envFile = env === "development" ? ".env" : `.env.${env}`;

const envPath = path.resolve(__dirname, envFile);
dotenv.config({ path: envPath });

console.log("✅ Entorno actual:", env);
console.log("🔑 Base de datos:", process.env.DB_NAME);

const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const db = require("./models");

const app = express();

// Configuración de Handlebars con helper "ifCond"
const hbs = exphbs.create({
  extname: ".hbs",
  defaultLayout: "layout",
  helpers: {
    ifCond: function (v1, operator, v2, options) {
      switch (operator) {
        case "==":
          return v1 == v2 ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    },
  },
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error("Error capturado:", err);
  res.status(500).send("Error interno del servidor");
});

// Rutas
app.use("/pokemones", require("./routes/pokemones.routes"));
app.use("/regiones", require("./routes/regiones.routes"));
app.use("/tipos", require("./routes/tipos.routes"));

// Ruta principal
app.get("/", async (req, res) => {
  try {
    const { Pokemon, Region, Tipo, Sequelize } = db;
    const { nombre, region } = req.query;

    const where = {};
    if (nombre) where.nombre = { [Sequelize.Op.like]: `%${nombre}%` };
    if (region) where.RegionId = region;

    const pokemones = await Pokemon.findAll({
      where,
      include: [Region, Tipo],
    });

    const regiones = await Region.findAll();

    const pokemonesPlain = pokemones.map((p) => p.get({ plain: true }));
    const regionesPlain = regiones.map((r) => r.get({ plain: true }));

    console.log("Pokemones cargados:", pokemonesPlain.length);
    console.log("Regiones cargadas:", regionesPlain.length);

    res.render("home/index", {
      pokemones: pokemonesPlain,
      regiones: regionesPlain,
      nombre,
      region,
    });
  } catch (error) {
    console.error("Error en ruta principal:", error);
    res.status(500).send(`Error cargando la página principal: ${error.message}`);
  }
});

// Servidor y sincronización de la base de datos
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ Error sincronizando la base de datos:", error);
  }
});
