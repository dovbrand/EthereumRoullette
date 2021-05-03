const cors = require('cors')
const app = express();

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: sql5.freemysqlhosting.net,
    user: sql5408535,
    password: CNFq9khMkW,
    database: sql5408535,
    port: 8081
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.use(cors());

app.get('/ranking', (req, res) => {
  connection.query("SELECT * FROM ranking;", (err, results, fields) => {
    if(err) throw err;
    res.send(results);
  });
});

app.listen(8080, (error) => {
  if (err) throw err;
  console.log(`App listening on port ${port}!`)
});
