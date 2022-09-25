const express = require("express");
const router = express.Router();

const financaController = require("../controllers/financaController.js");

router.post("/financa/salvar", financaController.financa_salvar);


module.exports = router;