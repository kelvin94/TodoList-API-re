//mongo client allows you to manipulate the db
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if(err){
        return console.log('Unable to connect to mongdb server');
    } 
    console.log('Connected to MongoDB server');


    db.collection('Todos').find({
        _id: new ObjectID('5931db39d5f6678fc8d414bd')
    }).toArray().then((counts) => {
        console.log('Fetched Todos',counts);
       
    }, (err) => {
        console.log('Unable to fetch Todos', err);
    });


    db.close();//close the connection
} );