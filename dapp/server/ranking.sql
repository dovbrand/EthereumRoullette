CREATE TABLE ranking AS
SELECT id, username, SUM(winningAmmount) FROM games 
GROUP BY id
ORDER BY winningAmmount DESC
LIMIT 10;

SELECT * from ranking;