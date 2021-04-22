// configure MySQL database & Sequelize
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "password",
  DB: "rou",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
