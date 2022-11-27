const express = require("express");
const router = express.Router();

const usuarioController = require("../controllers/usuarioController.js");

router.post("/usuario/login", usuarioController.usuario_login);
router.post("/usuario/salvar", usuarioController.usuario_salvar);
router.get("/usuario/listarTodos", usuarioController.checkToken, usuarioController.usuario_listarTodos);
router.get("/usuario/:id", usuarioController.checkToken, usuarioController.usuario_listar_um);
router.put("/usuario/editar/:id", usuarioController.checkToken, usuarioController.usuario_editar);
router.delete("/usuario/excluir/:id", usuarioController.checkToken, usuarioController.usuario_excluir);

module.exports = router;