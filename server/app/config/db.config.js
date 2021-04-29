// configure MySQL database & Sequelize
module.exports = {
  HOST: "sql5.freemysqlhosting.net",
  USER: "sql5408535",
  PASSWORD: "CNFq9khMkW",
  DB: "sql5408535",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
