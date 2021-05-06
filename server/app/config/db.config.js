// configure MySQL database & Sequelize
module.exports = {
  HOST: "freedb.tech",
  USER: "freedbtech_rou",
  PASSWORD: "1807Mich@3l",
  DB: "freedbtech_rousp",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
