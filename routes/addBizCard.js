const express = require("express");
const auth = require("../middleware/auth");
const functions = require("../globalFuncAndVariables");
const Cards = require("../models/Card");
const Joi = require("joi");
const _ = require("lodash");

const router = express.Router();

const formJoiSchema = Joi.object({
	title: Joi.string().min(2).max(30).required(),
	subTitle: Joi.string().min(2).max(30).required(),
	description: Joi.string().min(10).max(1000).required(),
	address: Joi.object({
		state: Joi.string().min(2).max(30).required(),
		city: Joi.string().min(2).max(30).required(),
		street: Joi.string().min(2).max(30).required(),
		houseNumber: Joi.number().integer(),
		zip: Joi.string().min(5),
	}),
	image: Joi.object({
		url: Joi.string().min(10).required(),
		alt: Joi.string().min(2).required(),
	}),
	bizNumber: Joi.string().min(2).max(30).required(),
	phone: Joi.string().min(10).required(),
	likes: Joi.array(),
	web: Joi.string().min(10).required(),
	email: Joi.string().email().required(),
	createdAt: Joi.date(),
});
// bizName: Joi.string().min(2).max(30).required(),
// 	description: Joi.string().min(10).max(1000).required(),
// 	address: Joi.string().min(2).max(20).required(),
// 	tel: Joi.string()
// 		.regex(/^05\d{8}$/)
// 		.max(10)
// 		.required(),
// 	img: Joi.string().min(10).required(),

router.post("/", auth, async (req, res) => {
	// * validate user input
	let errorJoi = await functions.validateData(req.body, formJoiSchema);
	if (errorJoi) return res.status(400).send("Oops Error ❌: " + errorJoi.details[0].message);

	//* create the card and save in DB
	let cardData = req.body;
	cardData.uniqueNum = await findUniqueNumber(_.random(0, 1500, false));
	cardData.userId = res.locals.user._id;
	let card = new Cards(cardData);
	console.log(card);
	await card
		.save()
		.then((result) => res.status(201).send("The card has been added ✅: " + result))
		.catch((err) => res.status(400).send("The card has not been added ❌: " + err));
});

async function findUniqueNumber(randomNum) {
	let random = randomNum;
	try {
		let card = await Cards.find({ uniqueNum: random });
		if (card.length > 0) {
			random = _.random(0, 1500, false);
			findUniqueNumber(random);
		}
		return random;
	} catch (error) {
		return res.status(400).send("error in register the user: " + error);
	}
}

module.exports = router;
