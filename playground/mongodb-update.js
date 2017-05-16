// De-structuring, from ES6:
// same as const MongoClient = require("mongodb").MongoClient;
const {MongoClient, ObjectID} = require("mongodb");

MongoClient.connect("mongodb://localhost:27017/TodoApp", (err, db) => {
	if (err) {
		return console.log("Connection Error: " + err);
	}

	console.log("Connected to MongoDB server.");

	// db.collection("Todos").findOneAndUpdate({
	// 	text: "Eat lunch"},
	// 	{
	// 		$set: {completed: true}
	// 	},
	// 	{
	// 		returnOriginal: false
	// 	}).then((result) => {
	// 	console.log(result);
	// });

	db.collection("Users").findOneAndUpdate({
		_id: new ObjectID("590fd5e0bc00893db683a93c")},
		{
			$set: {name: "Luca"},
			$inc: {age: 1}  // $inc is an operator like $set
		},
		{
			returnOriginal: false
		}).then((result) => {
		console.log(result);
	});


	db.close();
});