const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
const dbname = "confession_site";
const connectionString = "mongodb+srv://dbuser:dbpassword@cluster0.peiil.mongodb.net/confession_site?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
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