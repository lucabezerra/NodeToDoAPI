const expect = require("expect");
const request = require("supertest");

const {app} = require("./../server.js");
const {Todo} = require("./../models/todo.js");

const dummyTodos = [
	{text: "First test ToDo"},
	{text: "Second test ToDo"}
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
})