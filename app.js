const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const db = require("./db");
const helmet = require("helmet");
const compression = require("compression");
const collection = "confessions";


app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname));


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
        app.listen(process.env.PORT || 3000, () => {
            console.log("Successfully connected to database, listening on port 3000");
        });
    }
});