const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const crypto = require("crypto-js");
const app = express();
const path = require("path");
const db = require("./db");
const { SHA256 } = require("crypto-js");
const { param } = require("jquery");
const collection = "confessions";

const cookie = (req, res, next) => {
    const dtNow = new Date();
    console.log(`Setting cookie to hash of ${dtNow.toString()}`);
    res.cookie("id", SHA256(dtNow).toString()), {
        maxAge: 1000 * 60 * 60 * 24 * 30
    };
    next();
};

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));
//app.use(cookie);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});


app.get("/getRandConfession", (req, res) => {
    db.getDB().collection(collection).aggregate( [{$sample : {size : 1}}] ).toArray((err, documents) => {
        if (err)
            console.log(err);
        else
            res.json(documents);
    });
});


app.get("/ifConfExists/:id", (req, res) => {
    db.getDB().collection(collection).findOne({id: req.params.id}, (err, documents) => {
        if (err)
            console.log(err);
        else
            res.json(documents);
    });
});

app.post('/', (req, res) => {
    const userInput = req.body;
    db.getDB().collection(collection).insertOne(userInput, (err, result) => {
        if (err)
            console.log(err);
        else
            res.json({result : result, document : result.ops[0]});
    });
});


db.connect((err) => {
    if (err) {
        console.log("Cannot connect to database");
        process.exit(1);
    }
    else {
        app.listen(3000, () => {
            console.log("Successfully connected to database, listening on port 3000");
        });
    }
});