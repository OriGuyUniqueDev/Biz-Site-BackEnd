let mongoose = require("mongoose");
require("dotenv").config();
const jwt = require("jsonwebtoken");

let userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	state: {
		type: String,
	},
	country: {
		type: String,
		required: true,
	},
	city: {
		type: String,
		required: true,
	},
	street: {
		type: String,
		required: true,
	},
	houseNumber: {
		type: Number,
		required: true,
	},
	zip: {
		type: Number,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	imgUrl: {
		type: String,
	},
	imgAlt: {
		type: String,
	},
	biz: {
		type: Boolean,
		required: true,
	},
	bizName: {
		type: String,
		required: false,
	},
});

// add method to schema to add token to user documents
userSchema.methods.generateAuthToken = async function () {
	const token = jwt.sign({ _id: this._id, biz: this.biz }, process.env.ACCESS_TOKEN);
	return token;
};

let User = mongoose.model("users", userSchema);

module.exports = User;
