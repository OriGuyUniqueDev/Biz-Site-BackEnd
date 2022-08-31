const express = require("express");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const _ = require("lodash");
const router = express.Router();

//create mongoose schema
let cardMongooseSchema = new mongoose.Schema({
	bizName: String,
	description: String,
	address: String,
	tel: String,
	img: String,
	uniqueNum: {
		type: Number,
		unique: true,
	},
	userId: mongoose.ObjectId,
});

// create model to collection in DB
let Cards = new mongoose.model("cards", cardMongooseSchema);

router.post("/", auth, async (req, res) => {
	let cardData = req.body;
	cardData.uniqueNum = findUniqueNumber(_.random(0, 1500, false));
	cardData.userId = res.locals.user._id;
	let card = new Cards(cardData);
	await Cards.insertMany([card], null, (err, result) => {
		if (err)
			return res.status(400).send("The card has not been added ❌: " + err);
		return res.status(201).send("The card has been added ✅: " + result);
	});
});

router.get("/:anyParam", (req, res) => {
	res.status(404).redirect("/pageNotFound");
});

function findUniqueNumber(randomNum) {
	let random = randomNum;
	Cards.find({ uniqueNum: random }, (err, docs) => {
		if (err === null) {
			return;
		} else {
			random = _.random(0, 1500, false);
			findUniqueNumber(random);
		}
	});
	return random;
}

module.exports = {
	router,
	Cards,
	cardMongooseSchema,
};
