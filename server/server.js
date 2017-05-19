var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo.js");
var {User} = require("./models/user.js");
const {ObjectID} = require("mongodb");

var app = express();

app.use(bodyParser.json());

app.post("/todos", (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (err) => {
		res.status(400).send(err);
	});
});

app.get("/todos", (req, res) => {
	var todos = Todo.find().then((docs) => {
		res.send({todos: docs});
	}, (err) => {
		res.status(400).send(err);
	});
});

// GET /todos/12343252
app.get("/todos/:id", (req, res) => {
	if (!ObjectID.isValid(req.params.id)) {
		res.status(404).send();
	}

	var todo = Todo.findById(req.params.id).then((doc) => {
		if (!doc) {
			return res.status(404).send();
		}
		res.send({doc});
	}, (err) => {
		res.status(400).send();
	});
});


app.listen(3000, () =>{
	console.log("Server started on port 3000.");
});

module.exports = {app};