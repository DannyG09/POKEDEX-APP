const express = require("express");
const router = express.Router();
const controller = require("../controllers/regiones.controller");

router.get("/", controller.listar);
router.get("/create", controller.crearForm);
router.post("/create", controller.crear);
router.get("/edit/:id", controller.editarForm);
router.post("/edit/:id", controller.editar);
router.get("/delete/:id", controller.eliminarConfirm);
router.post("/delete/:id", controller.eliminar);

module.exports = router;
