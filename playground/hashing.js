const {SHA256} = require("crypto-js");
const jwt = require("jsonwebtoken");

var data = {
	id: 10
};

var token = jwt.sign(data, "thesecret");
console.log(token);

var decoded = jwt.verify(token, "thesecret");
console.log("Decoded", decoded);


// var message = "I am user #3";
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
// 	id: 4
// };

// var token = {
// 	data: data,
// 	hash: SHA256(JSON.stringify(data) + "secret").toString()
// }

// var resultHash = SHA256(JSON.stringify(data) + "secret").toString();

// if (resultHash === token.hash) {
// 	console.log("The data is valid.");
// } else {
// 	console.log("The data has been tampered.");
// }