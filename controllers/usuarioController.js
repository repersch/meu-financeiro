const jwt = require("jsonwebtoken")
const fs = require("fs");
const Usuario = require("../models/usuario.js");

const banco = require("../config/database/db");


const usuario_salvar =  (checkToken, async (req, res) => {
    await banco.sync();

    const nomeSalvar = req.body.nome;
    const senhaSalvar = req.body.senha;

    const usuarioSalvar = await Usuario.findOne({ where: { nome: nomeSalvar } })

    if (!usuarioSalvar) {
        const usuarioSalvo = await Usuario.create({
            nome: nomeSalvar,
            senha: senhaSalvar
        })
    
        res.send(usuarioSalvo);
    } else {
        return res.status(404).json({
            info: "Usuário já cadastrado."
        });  
    }

});


const usuario_login = (async (req, res) => {
    console.log(`Esperando login...`);
    const userName = req.headers["username"];
    const password = req.headers["password"];
    const usuarioLogar = await Usuario.findOne({ where: { nome: userName }})

    if (usuarioLogar !== undefined && usuarioLogar.nome === userName && usuarioLogar.senha === password) {
        const id = usuarioLogar.id;

        var privateKey = fs.readFileSync("./config/security/privateKey.key", "utf-8");
        var token = jwt.sign({ id }, privateKey, {
            algorithm: "RS256",
            expiresIn: 300
        })

        return res.status(200).json({
            mensagem: res.__("mensagem_login"),
            logged: true,
            token: token
        });
    }

    console.log(`Acesso não autorizado. Verifique o login e/ou senha.`);
    return res.status(401).json({
        logged: false,
        token: null
    });
});


const usuario_listarTodos = (checkToken, async (req, res) => {
    const usuarios = await Usuario.findAll();
    res.send(usuarios);
});


const usuario_listar_um = (checkToken, async (req, res) => {
    const usuarioBuscado = await Usuario.findByPk(req.params.id);
    if (!usuarioBuscado) {
        return res.status(404).json({"mensagem": "Não existe usuário cadastrado com esse Id."});
    }

    res.send(usuarioBuscado);
});


const usuario_editar = (checkToken, async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
        return res.status(404).json({"mensagem": "Não existe usuário cadastrado com esse Id."});
    }

    if (!req.body.senha) {
        return res.status(400).json({"mensagem": "Por favor, digite a nova senha"});
    }

    usuario.senha = req.body.senha;
    res.send(await usuario.save());
});


const usuario_excluir = (checkToken, async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
        return res.status(404).json({"mensagem": "Não existe usuário cadastrado com esse Id."});
    }

    res.send(await usuario.destroy());
})


function checkToken(req, res, next) {
    console.log(`Checking token...`);
    const token = req.headers["x-access-token"];
    if (!token) {
        return res.status(401).json(
            { logged: false, msg: "Token not retrieved" }
        );
    }

    const publicKey = fs.readFileSync("./config/security/publicKey.key", "utf-8");
    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, function (err, decoded) {
        if (err) {
            console.log(err);
            return res.status(401).json({ logged: false, msg: "Token inválido. Tente novamente..." })
        }
        console.log("Token decrypted");
        console.log(decoded);
        req.userId = decoded.id;
        next();
    });

}


module.exports = {
    usuario_salvar,
    usuario_listarTodos,
    usuario_login,
    usuario_listar_um,
    usuario_editar,
    usuario_excluir,
    checkToken
}