const {ObjectID} = require("mongodb");

const {mongoose} = require("./../server/db/mongoose.js");
const {Todo} = require("./../server/models/todo.js");
const {User} = require("./../server/models/user.js");

// var id = "591cb566e39b1126542763f0";

// if (!ObjectID.isValid(id)) {
// 	console.log("ID not valid!");
// }

// Todo.find({_id: id}).then((docs) => {
// 	console.log("Todos:", docs);
// }, (err) => {

// });

// Todo.findOne({_id: id}).then((doc) => {
// 	console.log("Todo:", doc);
// }, (err) => {

// });

// Todo.findById(id).then((doc) => {
// 	if (!doc) {
// 		return console.log("Id not found");
// 	}
// 	console.log("Todo by ID:", doc);
// }).catch((err) => {
// 	console.log(err);
// });

var id = "591c86fb91f3c622f2f6203d";

User.findById(id).then((user) => {
	if (!user) {
		return console.log("Unable to find user");
	}

	console.log(JSON.stringify(user, undefined, 2));
}, (err) => {
	console.log(err);
});