const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server.js");
const {Todo} = require("./../models/todo.js");
const {ObjectID} = require("mongodb");

const dummyTodos = [
	{_id: new ObjectID(), text: "First test ToDo"},
	{_id: new ObjectID(),text: "Second test ToDo"}
]

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(dummyTodos);
	}).then(() => done());
});

describe("POST /todos", () => {
	it("should create a new ToDo", (done) => {
		var text = "Test ToDo Text";

		request(app)
			.post("/todos")
			.send({text: text})
			.expect(200)
			.expect((res) => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find({text: text}).then((todos) => {
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);
					done();
				}).catch((err) => done(err));
			});
	});

	it("should not create todo with invalid body data", (done) => {
		request(app)
			.post("/todos")
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find().then((todos) => {
					expect(todos.length).toBe(2);
					done();
				}).catch((err) => done(err));
			});
	});
});

describe("GET /todos", () => {
	it("should get all ToDos", (done) => {
		request(app)
			.get("/todos")
			.expect(200)
			.expect((res) => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
});

describe("GET /todos/:id", () => {
	it("should get an existing todo by ID", (done) => {
		request(app)
			.get("/todos/" + dummyTodos[0]._id.toHexString())  // toHexString because it's an ObjectID
			.expect(200)
			.expect((res) => {
				expect(res.body.doc.text).toBe(dummyTodos[0].text);
			})
			.end(done);
	});

	it("should return a 404 if todo not found", (done) => {
		var hexId = new ObjectID().toHexString();

		request(app)
			.get(`/todos/${hexId}`)
			.expect(404)
			.end(done);
	});

	it("should return a 404 for non-object ids", (done) => {
		request(app)
			.get("/todos/123")
			.expect(404)
			.end(done);
	});
});
