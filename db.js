const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbname = "confession_site";
const mongoDB = process.env.MONGODB_URI;
const mongoOptions = {useNewUrlParser : true,
                    useUnifiedTopology: true};

const state = {
    db : null
};

const connect = (cb) => {
    if (state.db)
        cb();
    else {
        MongoClient.connect(mongoDB, mongoOptions, (err, client) => {
            if (err)
                cb(err);
            else {
                state.db = client.db(dbname);
                cb();
            }
        });
    }
}

const getDB = () => {
    return state.db;
}

module.exports = {getDB, connect};