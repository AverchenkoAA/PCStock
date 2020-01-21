const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = "mongodb://localhost:27017/PCStock";
const mongoClient = new MongoClient(MONGO_URL, { useUnifiedTopology: true });

const dbName = "PCStock";
const collectionName = "Computers";

export function ComputersWorker(){
    this.add=add;
    this.findAll=findAll;
    this.findOneBySerialNumber=findOneBySerialNumber;
    this.deleteOneBySerialNumber=deleteOneBySerialNumber;
    this.updateOneBySerialNumber=updateOneBySerialNumber;
}

function add(computer)
{
    mongoClient.connect(function(err, client){
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        collection.insertOne(computer, function(err, result){ 
            if(err){ 
                return console.log(err);
            }
            client.close();
            return result.ops;   
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
                return console.log("Error: "+err);
            } 
            client.close();
            console.log(JSON.stringify(result));
              result;
          });
    });

}

function findOneBySerialNumber(serNumber)
{
    mongoClient.connect(function(err, client){
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        let query = { serialNumber: serNumber };
        collection.find(query).toArray(function(err, result) {
            if(err){ 
                return console.log(err);
            }
            console.log(result);
            client.close();
          });
    });
}

function deleteOneBySerialNumber(serNumber)
{
    mongoClient.connect(function(err, client){
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        let query = { serialNumber: serNumber };
        collection.deleteOne(query, function(err, result) {
            if(err){ 
                return console.log(err);
            }
            console.log(result);
            client.close();
          });
    });
}

function updateOneBySerialNumber(serNumber, newComputer)
{
    mongoClient.connect(function(err, client){
        
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        let query = { serialNumber: serNumber };
        var newvalues = { $set: newComputer };
        collection.updateOne(query, newvalues, function(err, result) {
            if(err){ 
                return console.log(err);
            }
            console.log(result);
            client.close();
          });
    });
}
