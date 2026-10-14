const db = require("../models");

module.exports = {
  listar: async (req, res) => {
    try {
      const pokemones = await db.Pokemon.findAll({ include: [db.Region, db.Tipo] });
      const pokemonesPlain = pokemones.map(p => p.get({ plain: true }));
      res.render("pokemones/index", { pokemones: pokemonesPlain });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al listar pokemones");
    }
  },

  crearForm: async (req, res) => {
    try {
      const regiones = await db.Region.findAll();
      const tipos = await db.Tipo.findAll();
      const regionesPlain = regiones.map(r => r.get({ plain: true }));
      const tiposPlain = tipos.map(t => t.get({ plain: true }));
      res.render("pokemones/create", { regiones: regionesPlain, tipos: tiposPlain });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar formulario");
    }
  },

  crear: async (req, res) => {
    try {
      const { nombre, imagen, RegionId, TipoId } = req.body;
      await db.Pokemon.create({ nombre, imagen, RegionId, TipoId });
      res.redirect("/pokemones");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al crear Pokémon");
    }
  },

  editarForm: async (req, res) => {
    try {
      const pokemon = await db.Pokemon.findByPk(req.params.id);
      if (!pokemon) return res.status(404).send("Pokémon no encontrado");

      const regiones = await db.Region.findAll();
      const tipos = await db.Tipo.findAll();
      const regionesPlain = regiones.map(r => r.get({ plain: true }));
      const tiposPlain = tipos.map(t => t.get({ plain: true }));

      res.render("pokemones/edit", { 
        pokemon: pokemon.get({ plain: true }),
        regiones: regionesPlain,
        tipos: tiposPlain
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar formulario de edición");
    }
  },

  editar: async (req, res) => {
    try {
      const { nombre, imagen, RegionId, TipoId } = req.body;
      await db.Pokemon.update({ nombre, imagen, RegionId, TipoId }, { where: { id: req.params.id } });
      res.redirect("/pokemones");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al editar Pokémon");
    }
  },

  eliminarConfirm: async (req, res) => {
    try {
      const pokemon = await db.Pokemon.findByPk(req.params.id);
      if (!pokemon) return res.status(404).send("Pokémon no encontrado");
      res.render("pokemones/delete", { pokemon: pokemon.get({ plain: true }) });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar confirmación de eliminación");
    }
  },

  eliminar: async (req, res) => {
    try {
      await db.Pokemon.destroy({ where: { id: req.params.id } });
      res.redirect("/pokemones");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al eliminar Pokémon");
    }
  }
};
