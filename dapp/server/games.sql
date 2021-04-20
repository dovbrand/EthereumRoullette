USE rou;

CREATE TABLE games (
gameID INTEGER UNIQUE PRIMARY KEY AUTO_INCREMENT,
id INTEGER ,
username VARCHAR(255),
balanceBefore INTEGER DEFAULT NULL,
bettingAmmount INTEGER DEFAULT NULL,
balanceAfterBetting INTEGER AS (balanceBefore - bettingAmmount),
winningAmmount INTEGER DEFAULT NULL,
balanceAfterGame INTEGER AS (balanceAfterBetting + winningAmmount),
FOREIGN KEY (id) REFERENCES users (id),
FOREIGN KEY (username) REFERENCES users (username)
);

INSERT INTO games 
(id, username, balanceBefore, bettingAmmount, winningAmmount)
VALUES (1, 'inna', 1000, 50, 100);

INSERT INTO games 
(id, username, balanceBefore, bettingAmmount, winningAmmount)
VALUES (2, 'innabaryanova', 3000, 350, 3000);

INSERT INTO games 
(id, username, balanceBefore, bettingAmmount, winningAmmount)
VALUES (2, 'innabaryanova', 2000, 150, 200);


CREATE VIEW myGames AS SELECT * FROM games WHERE id = '2';

SELECT * FROM myGames;

