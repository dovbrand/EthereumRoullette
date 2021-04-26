applicationCache.get('/api/totalWinnings', function( req,res){
    
    const totalWinnings = await userGames.findAll({
        attributes: [
            'id',
            [sequelize.fn('sum', sequelize.col('winningAmmount')), 'totalWinnings'  // get a total winning ammount for each user 
        ],
            ],
            group: ['id'],                              // get a sorted list of total winnings for all users in desc order 
            order:[ 'totalWinnings', 'DESC'],
            //limit:[ '100'],
        });

})

