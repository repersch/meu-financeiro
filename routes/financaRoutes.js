const express = require("express");
const router = express.Router();

const financaController = require("../controllers/financaController.js");
const usuarioController = require("../controllers/usuarioController.js");

router.post("/financa/salvar", usuarioController.checkToken, financaController.financa_salvar);
router.get("/financa", usuarioController.checkToken, financaController.financa_listarTodas);
router.get("/financa/usuario/:idUsuario", usuarioController.checkToken, financaController.financa_buscarPorUsuario);
router.get("/financa/:id", usuarioController.checkToken, financaController.financa_buscarPorId);
router.put("/financa/editar/:id", usuarioController.checkToken, financaController.financa_editar);
router.delete("/financa/excluir/:id", usuarioController.checkToken, financaController.financa_excluir);

module.exports = router;