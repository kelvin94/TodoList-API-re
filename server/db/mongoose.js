var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//相对于playground/mongodb-connect文件里面那种文件的链接mongodb的方法(也就是call mongo client),
//mongoose is maintaining the connection to DB all the time
mongoose.connect('mongodb://localhost:27017/TodoApp');

//######下面是如何存一个instance
//save instances to the DB, since not using callbacks( promise is more manageable and easy to chain)
// save() method returns a promise
// newTodo.save().then((doc)=> {
//     console.log('Saved Todo', doc);
// }, (e)=>{
//     console.log('Unable to save Todo');
// });
// newerTodo.save().then((doc)=> {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (e)=> {
//     console.log('Unable to save Todo', e)
// });

// user.save().then((doc)=>{
//     console.log('User is saved ', doc);
// }, (e)=>{
//     console.log('Unable to save user', e);
// });



module.exports = {
    mongoose
};


