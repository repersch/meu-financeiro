const banco = require("../config/database/db");
const Financa = require("../models/financa.js");
const usuarioController = require("../controllers/usuarioController.js");

const financa_salvar = (usuarioController.checkToken, async(req, res) => {
    await banco.sync();

    const descricaoSalvar = req.body.descricao;
    const valorSalvar = req.body.valor;
    //const dataSalvar = req.body.data;
    const categoriaSalvar = req.body.categoria;
    const tipoSalvar = req.body.tipo;
    // encontrar uma forma de trazer esse id automaticamente conforme o usuário que está logado
    const idUsuarioSalvar = req.body.idUsuario;

    const financaSalva = await Financa.create({
        descricao: descricaoSalvar,
        valor: valorSalvar,
        //data: dataSalvar,
        categoria: categoriaSalvar,
        tipo: tipoSalvar,
        idUsuario: idUsuarioSalvar
    });

    res.send(financaSalva);
    res.status(201);
})


module.exports = {
    financa_salvar
}