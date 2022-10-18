const { Sequelize } = require("sequelize");

const db = new Sequelize("coder_enam", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
