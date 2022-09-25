const express = require("express");
const bodyParser = require("body-parser");
const port = 8081;
const app = express();

//const sequelize = require("./config/database/db.js");
const usuarioRoutes = require("./routes/usuarioRoutes.js");
const financaRoutes = require("./routes/financaRoutes.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


/**
 * Chamada para as rotas de usuário em usuarioRoutes.js
 */
app.use(usuarioRoutes);
app.use(financaRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

/**
 * Sincronizando os modelos do projeto com as tabelas do banco de dados,
 * caso não encontre as tabelas, elas serão automaticamente criadas.
 * No entanto, é necessário que o banco já esteja criado
 */
/*(async () => {
    const database = require("./config/database/db.js");
    const Usuario = require("./models/usuario.js");
    await database.sync();

    const novoUsuario = Usuario.create({
        nome: "João",
        senha: "crossfit"
    });
})();*/