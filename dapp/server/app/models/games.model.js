module.exports = (sequelize, Sequelize) => {
    const Games = sequelize.define("games", {
      gameid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false
      },
      //id:{
      //  type: Sequelize.INTEGER,
      //},
      username:{
        type: Sequelize.INTEGER,
      },
      balanceBefore:{
        type: Sequelize.INTEGER,
      },
      bettingAmmount:{
        type: Sequelize.INTEGER,
      },
      balanceAfterBetting:{
        type: Sequelize.INTEGER,
      },
      winningAmmount:{
        type: Sequelize.INTEGER,
      },
      balanceAfterGame:{
        type: Sequelize.INTEGER,
      },
      

    });
  
    return Games;
  };

