let mongoose = require("mongoose");

let cardSchema = new mongoose.Schema({
	title: String,
	subTitle: String,
	description: String,
	address: {
		state: String,
		city: String,
		street: String,
		houseNumber: Number,
		zip: Number,
	},
	image: { url: String, alt: String },
	bizNumber: String,
	phone: String,
	likes: [String],
	web: String,
	email: String,
	createdAt: String,
	uniqueNum: Number,
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
