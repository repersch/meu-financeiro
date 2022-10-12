const { DECIMAL, ENUM } = require("sequelize");
const Sequelize = require("sequelize");

const database = require("../config/database/db.js");
const Usuario = require("./usuario.js");

const tipo = new ENUM(["DESPESA", "RECEITA"])

const Financa = database.define("financa", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    descricao: {
        type: String,
        allowNull: false
    },
    // data: {
    //     type: Date,
    //     allowNull: false
    // }, 
    valor: {
        type: DECIMAL,
        allowNull: false
    },
    categoria: {
        type: String,
        allowNull: false
    },
    tipo: {
        type: tipo,
        allowNull: false
    }
});

// uma finança pertence a um usuário
Financa.belongsTo(Usuario, {
    constraint: true,
    foreignKey: "idUsuario"
});

module.exports = Financa;
