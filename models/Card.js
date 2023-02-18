let mongoose = require("mongoose");

let cardSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	state: {
		type: String,
		required: false,
	},
	country: String,
	city: String,
	street: String,
	houseNumber: Number,
	zip: {
		type: String,
		required: false,
	},
	email: String,
	password: String,
	phone: String,
	imgUrl: {
		type: String,
		required: false,
	},
	imgAlt: {
		type: String,
		required: false,
	},
	biz: Boolean,
	bizName: {
		type: Boolean,
		required: false,
	},
	userId: mongoose.ObjectId,
});

let Cards = mongoose.model("cards", cardSchema);

module.exports = Cards;

// bizName: String,
// 	description: String,
// 	address: String,
// 	tel: String,
// 	img: String,
// 	uniqueNum: {
// 		type: Number,
// 		unique: true,
// 	},
