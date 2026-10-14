# 🎮 Pokédex App

Aplicación web CRUD de una Pokédex construida con **Node.js, Express, Sequelize (SQL Server) y Handlebars**. Permite administrar Pokémon, tipos y regiones, y filtrar Pokémon por nombre y región desde la página principal.

## ✨ Funcionalidades

- CRUD completo de **Pokémon**, **Tipos** y **Regiones**.
- Cada Pokémon tiene nombre, imagen (URL), un tipo y una región.
- Búsqueda por nombre y filtro por región en la página principal.
- Sincronización automática de las tablas con Sequelize al iniciar.
- Configuración por entornos (`development`, `qa`, `production`).

## 🛠️ Tecnologías

| Área | Herramienta |
|---|---|
| Backend | Node.js, Express 5 |
| ORM | Sequelize 6 |
| Base de datos | Microsoft SQL Server (`mssql`, `tedious`) |
| Vistas | express-handlebars |
| Utilidades | dotenv, cross-env, nodemon |

## 📋 Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- Una instancia de **SQL Server** accesible, con una base de datos vacía creada
- npm

## 🚀 Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/TU_USUARIO/pokedex-app.git
cd pokedex-app

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus credenciales
```

### Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `NODE_ENV` | Entorno de ejecución | `development` |
| `DB_USER` | Usuario de SQL Server | `sa` |
| `DB_PASS` | Contraseña | `********` |
| `DB_NAME` | Nombre de la base de datos | `pokedex` |
| `DB_HOST` | Servidor de base de datos | `localhost` |
| `PORT` | Puerto de la app | `3000` |

> Para el entorno QA crea un archivo `.env.qa` con las mismas variables.

## ▶️ Ejecución

```bash
npm run start:dev   # desarrollo (nodemon, usa .env)
npm run start:qa    # QA (usa .env.qa)
npm start           # producción (usa .env.production)
```

Abre **http://localhost:3000**. Las tablas se crean/actualizan solas al arrancar (`sequelize.sync({ alter: true })`).

## 📁 Estructura

```
pokedex-app/
├── app.js               # Punto de entrada, rutas y configuración
├── config/              # Configuración de base de datos
├── controllers/         # Lógica de pokemones, tipos y regiones
├── models/              # Modelos Sequelize y relaciones
├── routes/              # Rutas Express
├── views/               # Plantillas Handlebars (layouts, home, CRUD)
└── public/css/          # Estilos
```

## 🔗 Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Home con búsqueda y filtro por región |
| `/pokemones` | Listado y CRUD de Pokémon |
| `/tipos` | Listado y CRUD de tipos |
| `/regiones` | Listado y CRUD de regiones |

## 🗃️ Modelo de datos

- **Region** (`nombre`) → tiene muchos Pokémon
- **Tipo** (`nombre`) → tiene muchos Pokémon
- **Pokemon** (`nombre`, `imagen`) → pertenece a una Región y a un Tipo

## 👤 Autor

**Danny Guerrero**


