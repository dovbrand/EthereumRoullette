const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { Cookie } = require("express-session");
const saltRounds = 10;

// Setting up the app with CORS
const app = express();

var corsOptions = {
    origin: 'http://localhost:3000',
    credentials : true
   }
  
app.use(cors(corsOptions));

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers", 
        "x-access-token, Origin, Content-Type, Accept"
        );
    next();
});

// session and cookies
// app.use(express.json());
// app.use(cors({
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//     credentials: true
// }));
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true}));

// app.use(
//     session({
//         key: "userId",
//         secret: "rou",
//         resave: false,
//         saveUninitialized: false,
//         cookie: {
//             expires: 60 * 60 * 24
//         },
//     })
// );

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "rou",
});

app.post('/register', (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if (err) {
            console.log(err);
        }

        db.query(
            "INSERT INTO users (username, password) VALUES (?,?)", 
            [username, hash], 
            (err, result) => {
                console.log(err);
            }
        );
    })
});

// app.get("/login", (req, res) => {
//     if (req.session.user) {
//         res.send({ loggedIn: true, user: req.session.user })
//     } else {
//         res.send({ loggedIn: false})
//     }
// });

app.post('/login', (req, res) => {
    alert("got it")
    
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE username = ?;", 
        username, 
        (err, result) => {
            if (err) {
                res.send({ err: err});
            } 
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response) {
                        req.session.user = result;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({ message: "Wrong username/password combination!" })
                    }
                });
            } else {
                res.send({ message: "User doesn't exist" });
            }
        }
    )
})

app.listen(3001, ()=>{
    console.log("running server");
});