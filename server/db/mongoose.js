var mongoose = require("mongoose");

mongoose.Promise = global.Promise;  // we tell mongoose we want to use the built-in promises
mongoose.connect(process.env.MONGODB_URI);


module.exports.mongoose = mongoose;