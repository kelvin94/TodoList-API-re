const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {ObjectID} = require('mongodb');

// dummy data for testing
const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'second test todo'
}];


// testing code lifecycle method: beforeEach
// run some code before every single test case
// use before each to set up the DB in order to be useful
beforeEach( (done) => {
    Todo.remove().then( () => {
        return Todo.insertMany(todos);
        
    }).then( () => { done() });
});






// describe('POST /todos', () => {
//     it('should create a new todo', (done) => {
//         var text = 'Test todo text';

//         request(app)
//             .post('/todos')
//             .send({
//                 text
//             })// Here, supertest library converts this obj to JSON obj automatically
//             .expect(200)
//             .expect( (res) => {
//                 expect(res.body.text).toBe(text);
//             })
//             .end( (err, res) => {
//                 if(err) {
//                     return done(err);
//                 }//adding in return to stop the whole test

//                 Todo.find({text}).then( (todos) => {
//                     expect(todos.length).toBe(1);
//                     expect(todos[0].text).toBe(text);
//                     done();
//                 }).catch((e) => done(e));//The catch() method returns a Promise and deals with rejected cases only.
//             });
//     });

//     it('should not create Todo with invalid body data', () => {
//         request(app)
//             .post('/todos')
//             .send({})
//             .expect(400)
//             .end( (err, res) => {
//                 if(err) {
//                     return done(err);
//                 }
//                 Todo.find().then( (todos) => {
//                     expect(todos.length).toBe(2);
//                     done();
//                 }).catch( (e) => {done(e);} );
//             });
//     });





// });



// describe('GET /todos', () => {
//     it('should get all todos', (done) => {
//         request(app)
//             .get('/todos')
//             .expect(200)
//             .expect( (res) => {
//                 expect(res.body.todos.length).toBe(2);
//             })
//             .end(done);


//     });
// });



// GET /todos/:id Test
describe('GET /todos/:id ', () => {
    it('should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found' , (done) => {
        todos[0]._id = new ObjectID();
        request(app)
            .get(`/todos/${todos[0]._id}`)
            .expect(404)
            .end(done);
    });


    it('should return 404 for non-object ids', (done) => {
        request(app)
            .get('/todos/123abc')
            .expect(404)
            .end(done);
    });

});


