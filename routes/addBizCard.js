const express = require("express");
const auth = require("../middleware/auth");
const functions = require("../globalFuncAndVariables");
const Cards = require("../models/Card");
const Joi = require("joi");
const _ = require("lodash");

const router = express.Router();

const formJoiSchema = Joi.object({
	bizName: Joi.string().min(2).max(30).required(),
	bizField: Joi.string().min(2).max(30).required(),
	state: Joi.string().min(0).max(30),
	country: Joi.string().min(2).max(30),
	city: Joi.string().min(2).max(30).required(),
	street: Joi.string().min(2).max(30).required(),
	houseNumber: Joi.number().integer(),
	imgUrl: Joi.string().min(10).required(),
	imgAlt: Joi.string().min(2).required(),
	phone: Joi.string().min(10).required(),
	likes: Joi.array(),
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
	if (errorJoi) return res.status(400).send(" " + errorJoi.details[0].message);

	//* create the card and save in DB
	let cardData = req.body;
	cardData.uniqueNum = await findUniqueNumber(_.random(0, 1500, false));
	cardData.likes = [];
	cardData.userId = res.locals.user._id;
	cardData;
	let card = new Cards(cardData);
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
