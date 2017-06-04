// ROOT OF THE API

var express = require('express');
var bodyParser = require('body-parser');

// local imports
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

// The function returned from bodyParser.json() is the middleware that we put inside the .use() method argument
// body-parser extract the entire body portion of an incoming request stream and exposes it on req.body as something easier to interface with .
app.use(bodyParser.json());


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




app.listen(3000, () => {
    console.log('Starting App on port 3000');
});
