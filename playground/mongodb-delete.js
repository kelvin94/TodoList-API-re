//mongo client allows you to manipulate the db
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if(err){
        return console.log('Unable to connect to mongdb server');
    } 
    console.log('Connected to MongoDB server');

    //delete many
    // db.collection('Todos').deleteMany({text: 'lunch'}).then( (result) => {
    //     console.log(result);

    // });

    //delete one
    // db.collection('Todos').deleteOne({text: 'lunch'}).then( (res)=>{
    //     console.log(res);
    // });

    // findOneAndDelete, delete one and return it
    // db.collection('Todos').findOneAndDelete({_id: new ObjectID('59310bcd7a6594046f13bd76')}).then( (res)=>{
    //     console.log(res);
    // })

    db.collection('Todos').deleteMany({text: 'lunch'});

    db.close();//close the connection
} );