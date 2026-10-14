const db = require("../models");

module.exports = {
  listar: async (req, res) => {
    try {
      const regiones = await db.Region.findAll();
      const regionesPlain = regiones.map(r => r.get({ plain: true }));
      res.render("regiones/index", { regiones: regionesPlain });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al listar regiones");
    }
  },

  crearForm: (req, res) => {
    res.render("regiones/create");
  },

  crear: async (req, res) => {
    try {
      await db.Region.create({ nombre: req.body.nombre });
      res.redirect("/regiones");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al crear región");
    }
  },

  editarForm: async (req, res) => {
    try {
      const region = await db.Region.findByPk(req.params.id);
      if (!region) return res.status(404).send("Región no encontrada");
      res.render("regiones/edit", { region: region.get({ plain: true }) });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar formulario de edición");
    }
  },

  editar: async (req, res) => {
    try {
      await db.Region.update({ nombre: req.body.nombre }, { where: { id: req.params.id } });
      res.redirect("/regiones");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al editar región");
    }
  },

  eliminarConfirm: async (req, res) => {
    try {
      const region = await db.Region.findByPk(req.params.id);
      if (!region) return res.status(404).send("Región no encontrada");
      res.render("regiones/delete", { region: region.get({ plain: true }) });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar confirmación de eliminación");
    }
  },

  eliminar: async (req, res) => {
    try {
      await db.Region.destroy({ where: { id: req.params.id } });
      res.redirect("/regiones");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al eliminar región");
    }
  }
};
