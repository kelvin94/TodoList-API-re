const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

var id = '5933afb55b127a5518261d74';
var userID = '5932dc184f9bb29d0c1985f8';


// #### 各种validation的method
if(!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

if(!ObjectID.isValid(userID) ){
    console.log('userID not valid');
}
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(todos);
// });

// Todo.findOne({
//     _id: id
// }).then( (todo) => {
//     console.log(todo);
// });

// Todo.findById(id).then( (todo) => {
//     if(!todo) {
//         return console.log('Id not found');
//     }

//     console.log('todo by ID', todo);
// }).catch( (e)=> {
//     console.log(e);
// });



User.findById(userID).then( (docs) => {
    if(!docs) {

        return console.log('userID not found');
    }
    console.log('UserID is found', JSON.stringify(docs,undefined,2));
}).catch( (e) => {
    console.log(e);
});
