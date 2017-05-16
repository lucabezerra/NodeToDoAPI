// De-structuring, from ES6:
// same as const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
	if (err) {
		return console.log("Connection Error: " + err);
	}

	console.log("Connected to MongoDB server.");

	// db.collection("Todos").insertOne({
	// 	text: "Finish Node.js course."
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log("Insertion error: " + err);
	// 	}
	// 	console.log(JSON.stringify(result.ops));
	// });

	// db.collection("Users").insertOne({
	// 	name: "Luca",
	// 	age: 27,
	// 	location: "Recife"
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log("Insertion error: " + err);
	// 	}
	// 	console.log(result.ops[0]._id.getTimestamp());
	// });

	db.close();
});