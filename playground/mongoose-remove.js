const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose.js");
const {Todo} = require("./../server/models/todo.js");
const {User} = require("./../server/models/user.js");

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });


// Todo.findOneAndRemove({}).then((result) => {
// 	console.log("Find one and remove:", result);
// });

Todo.findByIdAndRemove("591e47f7ef13d40813cf62be").then((todo) => {
	console.log("Find by ID and remove:", todo);
});