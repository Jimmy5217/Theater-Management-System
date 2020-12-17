const MongoClient = require('mongodb').MongoClient;
const settings = {
  mongoConfig: {
    serverUrl: 'mongodb://localhost:27017/',
    //serverUrl:'mongodb+srv://dbCS546:China1a2b3c@cluster0.ucuth.mongodb.net/CS546_group8?retryWrites=true&w=majority',
    database: 'CS546_group8'
  }
};
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
};