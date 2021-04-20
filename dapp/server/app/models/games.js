module.exports = (sequelize, Sequelize) => {
    const Game = sequelize.define("games", {
      gamesID: {
        type: Sequelize.INTEGER
      },
      balanceBefore: {
        type: Sequelize.INTEGER
      },
      bettingAmmount: {
        type: Sequelize.INTEGER
      },
      balanceAfter: {
        type: Sequelize.INTEGER
      },
      winnings: {
        type: Sequelize.INTEGER
      }
    });
  
    return Game;
  };