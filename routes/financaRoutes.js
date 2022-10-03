const express = require("express");
const router = express.Router();

const financaController = require("../controllers/financaController.js");

router.post("/financa/salvar", financaController.financa_salvar);
router.get("/financa", financaController.financa_listarTodas);
router.get("/financa/usuario/:idUsuario", financaController.financa_buscarPorUsuario);
router.get("/financa/:id", financaController.financa_buscarPorId);
router.put("/financa/editar/:id", financaController.financa_editar);

module.exports = router;