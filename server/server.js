var express = require("express");
var bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo.js");
var {User} = require("./models/user.js");
const {ObjectID} = require("mongodb");

var app = express();
const port = process.env.PORT || 3000;

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


app.delete("/todos/:id", (req, res) => {
	if (!ObjectID.isValid(req.params.id)) {
		return res.status(404).send();
	}

	var todo = Todo.findByIdAndRemove(req.params.id).then((todo) => {
		if (!todo) {
			return res.status(404).send("Document not found.");
		}

		res.send({todo});
	}, (err) => {
		res.status(404).send("Id is not valid.");
	});
});


app.listen(port, () =>{
	console.log(`Server started on port ${port}.`);
});

module.exports = {app};