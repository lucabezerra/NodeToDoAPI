var mongoose = require("mongoose");

mongoose.Promise = global.Promise;  // we tell mongoose we want to use the built-in promises
mongoose.connect("mongodb://localhost:27017/TodoApp");


module.exports.mongoose = mongoose;