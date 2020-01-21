const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017/PCStock";
const mongoClient = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

const dbName = "PCStock";
const collectionName = "Users";

export function UsersWorker(){
    this.add=add;
    this.findAll=findAll;
    this.findOneByLogin=findOneByLogin;
    this.deleteOneByLogin=deleteOneByLogin;
    this.updateOneByLogin=updateOneByLogin;
}

function add(users)
{
    mongoClient.connect(function(err, client){
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertOne(users, function(err, result){ 
            if(err){ 
                return console.log(err);
            }
            console.log(result.ops);
            client.close();
        });
    });
}

function findAll()
{
    mongoClient.connect(function(err, client){
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.find({}).toArray(function(err, result) {
            if(err){ 
                return console.log(err);
            }
            console.log(result);
            client.close();
          });
    });
}

function findOneByLogin(userLogin)
{
    mongoClient.connect(function(err, client){
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        let query = { login: userLogin };
        collection.find(query).toArray(function(err, result) {
            if(err){ 
                return console.log(err);
            }
            console.log(result);
            client.close();
          });
    });
}

function deleteOneByLogin(userLogin)
{
    mongoClient.connect(function(err, client){
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        let query = { login: userLogin };
        collection.deleteOne(query, function(err, result) {
            if(err){ 
                return console.log(err);
            }
            console.log(result);
            client.close();
          });
    });
}

function updateOneByLogin(userLogin, newUsers)
{
    mongoClient.connect(function(err, client){
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        let query = { login: userLogin };
        var newvalues = { $set: newUsers };
        collection.updateOne(query, newvalues, function(err, result) {
            if(err){ 
                return console.log(err);
            }
            console.log(result);
            client.close();
          });
    });
}
