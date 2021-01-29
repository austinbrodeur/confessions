const MongoClient = require("mongodb").MongoClient;
const dbname = "confession_site";
const mongoDB = process.env.MONGODB_URI;


const connect = () => {
    MongoClient.connect(mongoDB, function(err, client){
        assert.equal(null, err);
        console.log("Connected to database.");

        const db = client.db(dbname);
        client.close();
    });
}


module.exports = {connect};