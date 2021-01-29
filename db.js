const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbname = "confession_site";
const connectionString = "mongodb+srv://austinbrodeur:Vptr4X7KmWhFiaNl@cluster0.peiil.mongodb.net/confession_site?retryWrites=true";
const mongoOptions = {useNewUrlParser : true,
                    useUnifiedTopology: true};

const state = {
    db : null
};

const connect = (cb) => {
    if (state.db)
        cb();
    else {
        MongoClient.connect(connectionString, mongoOptions, (err, client) => {
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