const Sequelize = require("sequelize");

const sequelize = new Sequelize("financeiro-db", "admin", "senha", {
    host: "./financeiro.db",
    dialect: "sqlite"
});

(async function () {
    try {
        await sequelize.authenticate();
        console.log(`Connected successfully`);
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();

module.exports = sequelize;