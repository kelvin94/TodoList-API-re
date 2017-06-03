//mongo client allows you to manipulate the db
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if(err){
        return console.log('Unable to connect to mongdb server');
    } 
    console.log('Connected to MongoDB server');


    //insert a new record to a new collection
   db.collection('Todos').insertOne({
        text: 'something',
        complete: false
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert Todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });
   db.collection('Users').insertOne({
        name: 'kelvin',
        age: 23,
        location: 'van'
    }, (err, result) => {
        if(err){
            return console.log('Unable to insert Todo', err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2));
    });


    db.close();//close the connection
} );