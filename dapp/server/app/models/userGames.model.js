const { sequelize } = require(".");

//module.exports = (sequelize, Sequelize) => {
//    const userGames = sequelize.define("userGames",
//    {


// find all the games records for the current user
User.hasMany (Games, {foreignKey: 'id'});
Games.belongsTo(User, {foreignKey: 'id'});

sequelize.sync();


Games.findAll({where: {}, include: [User]});




