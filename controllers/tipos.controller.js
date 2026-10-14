const db = require("../models");

module.exports = {
  listar: async (req, res) => {
    try {
      const tipos = await db.Tipo.findAll();
      const tiposPlain = tipos.map(t => t.get({ plain: true }));
      res.render("tipos/index", { tipos: tiposPlain });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al listar tipos");
    }
  },

  crearForm: (req, res) => {
    res.render("tipos/create");
  },

  crear: async (req, res) => {
    try {
      await db.Tipo.create({ nombre: req.body.nombre });
      res.redirect("/tipos");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al crear tipo");
    }
  },

  editarForm: async (req, res) => {
    try {
      const tipo = await db.Tipo.findByPk(req.params.id);
      if (!tipo) return res.status(404).send("Tipo no encontrado");
      res.render("tipos/edit", { tipo: tipo.get({ plain: true }) });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar formulario de edición");
    }
  },

  editar: async (req, res) => {
    try {
      await db.Tipo.update({ nombre: req.body.nombre }, { where: { id: req.params.id } });
      res.redirect("/tipos");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al editar tipo");
    }
  },

  eliminarConfirm: async (req, res) => {
    try {
      const tipo = await db.Tipo.findByPk(req.params.id);
      if (!tipo) return res.status(404).send("Tipo no encontrado");
      res.render("tipos/delete", { tipo: tipo.get({ plain: true }) });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al cargar confirmación de eliminación");
    }
  },

  eliminar: async (req, res) => {
    try {
      await db.Tipo.destroy({ where: { id: req.params.id } });
      res.redirect("/tipos");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al eliminar tipo");
    }
  }
};
