require('./config/config.js');


// ROOT OF THE API

var express = require('express');
var bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');


// local imports
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

// The function returned from bodyParser.json() is the middleware that we put inside the .use() method argument
// body-parser extract the entire body portion of an incoming request stream and exposes it on req.body as something easier to interface with .
app.use(bodyParser.json());

// POST new todo
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then( (doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

// GET all route
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({
            todos
        })
    }, (e) => {
        res.status(400).send(e);
    });
});

//GET /todos/id
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;

    // valid id using isValid
    if(!ObjectID.isValid(id)) {
        // 404 - send back empty send
        return res.status(404).send();
    }

    // findById
        //success
            // if todo - send it back
            //if no todo - send back 404 with empty body
        // fail
            // 400 - and send empty body back
    Todo.findById(id).then( (todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch( (e) => {
        res.status(400).send();
    });
});


app.delete('/todos/:id', (req, res) => {
    // get the id
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
        //success
    Todo.findByIdAndRemove(id).then( (todo) => {
            //if no doc, send 404
            // if doc, send doc back with 200
        //error
            // 400 with empty body
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo});

    }).catch((e) =>{
        res.status(400).send();
    });

});


// PATCH /todos/:id
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    // lodash is used to get the body of the req, which is the content
    // req.body is where to store the content we want to update
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    if( _.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }


    // Queries to update the DB
    Todo.findByIdAndUpdate(id, {
        $set: body
    }, { new: true, runValidators: true}).then( (todo) => {
        if(!todo){
            return res.status(404).send();
        }

        res.status(200).send({todo});
    }).catch( (e) => {
        res.status(400).send();
    })

});



app.listen(port, () => {
    console.log(`Starting App on port ${port}`);
});

module.exports = {
    app

};