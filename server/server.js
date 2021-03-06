require("./config.js");
const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");

var {mongoose} = require("./db/mongoose.js");
var {Todo} = require("./models/todo.js");
var {User} = require("./models/user.js");
const {ObjectID} = require("mongodb");

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());


// *************************************
// *************** TODOS ***************
// *************************************


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


app.patch("/todos/:id", (req, res) => {
	var id = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']);

	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}

	if (_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
		if (!todo) {
			return res.status(404).send();
		}

		res.send({todo});
	}).catch((err) => {
		res.status(400).send();
	})
});


// *************************************
// *************** USERS ***************
// *************************************


app.post("/users", (req, res) => {
	var body = _.pick(req.body, ["email", "password"]);
	var user = new User(body);

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) => {
		res.header({"x-auth": token}).send(user);
	}).catch((err) => {
		res.status(400).send(err);
	});
})


app.listen(port, () =>{
	console.log(`Server started on port ${port}.`);
});

module.exports = {app};