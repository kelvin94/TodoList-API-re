const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

// testing code lifecycle method: beforeEach
// run some code before every single test case
// use before each to set up the DB in order to be useful
beforeEach( (done) => {
    Todo.remove().then( () => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({
                text
            })// Here, supertest library converts this obj to JSON obj automatically
            .expect(200)
            .expect( (res) => {
                expect(res.body.text).toBe(text);
            })
            .end( (err, res) => {
                if(err) {
                    return done(err);
                }//adding in return to stop the whole test

                Todo.find().then( (todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));//The catch() method returns a Promise and deals with rejected cases only.
            });
    });

    it('should not create Todo with invalid body data', () => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end( (err, res) => {
                if(err) {
                    return done(err);
                }
                Todo.find().then( (todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch( (e) => {done(e);} );
            });
    });





});