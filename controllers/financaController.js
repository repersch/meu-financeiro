const banco = require("../config/database/db");
const Financa = require("../models/financa.js");
const usuarioController = require("../controllers/usuarioController.js");
const Usuario = require("../models/usuario");

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
});

const financa_listarTodas = (usuarioController.checkToken, async(req, res) => {
    const financas = await Financa.findAll();
    res.send(financas);
});

const financa_buscarPorUsuario = (usuarioController.checkToken, async(req, res) => {
    const idUsuarioBuscado = req.params.idUsuario;
    if (!await Usuario.findByPk(idUsuarioBuscado)) {
        return res.status(404).json({"mensagem": "Não existe usuário cadastrado com esse Id."});
    }

    const financasUsuario = await Financa.findAll( {
        where: {
            idUsuario: idUsuarioBuscado 
        }
    });
    res.send(financasUsuario);
});

const financa_buscarPorId = (usuarioController.checkToken, async(req, res) => {
    const financaBuscada = await Financa.findByPk(req.params.id);

    if (!financaBuscada) {
        return res.status(404).json({"mensagem": "Não existe finança cadastrada com esse Id."});
    }
    res.send(financaBuscada);
});

const financa_editar = (usuarioController.checkToken, async (req, res) => {
    const financa = await Financa.findByPk(req.params.id);
    if (!financa) {
        return res.status(404).json({"mensagem": "Não existe finança cadastrada com esse Id."});
    }

    financa.descricao = req.body.descricao;
    financa.valor = req.body.valor;
    financa.categoria = req.body.categoria;
    financa.tipo = req.body.tipo;

    res.send(await financa.save());
});

const financa_excluir = (usuarioController.checkToken, async (req, res) => {
    const financa = await Financa.findByPk(req.params.id);
    if (!financa) {
        return res.status(404).json({"mensagem": "Não existe finança cadastrada com esse Id."});
    }

    res.send(await financa.destroy());
});

module.exports = {
    financa_salvar,
    financa_listarTodas,
    financa_buscarPorUsuario,
    financa_buscarPorId,
    financa_editar,
    financa_excluir
}