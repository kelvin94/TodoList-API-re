const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {ObjectID} = require('mongodb');
const {User} = require('./../server/models/user');

// Todo.remove({}) => remove everything
// Todo.remove({}).then( (result) => {
//     console.log(result);
// });

// findOneAndRemove will return the first one we find, then return it
// similiar to findByIdAndremove
// Todo.findByIdAndRemove('5934911ad5f6678fc8d486fe').then( (todo) => {
//     console.log(todo);
// });
Todo.findOneAndRemove({_id: '5934911ad5f6678fc8d486fe'}).then( (result) => {
    console.log(result);
})


