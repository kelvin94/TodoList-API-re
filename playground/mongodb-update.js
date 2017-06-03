//mongo client allows you to manipulate the db
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) =>{
    if(err){
        return console.log('Unable to connect to mongdb server');
    } 
    console.log('Connected to MongoDB server');

    // update and return its original(这个是可以改成不return original的)
    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('59322bc9d5f6678fc8d41b76')
    // }, { //下面是update operator
    //     $set: {
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result)=>{
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({
        name: 'Gem'
    }, {
        $set: {
            location: 'HongKong'
        },
        $inc: {
            age: 2,
            height: 100
        }
    }, {
        returnOriginal: false
    }).then( (result)=> {
        console.log(result);
    });

    db.close();//close the connection
} );