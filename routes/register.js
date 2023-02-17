const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const functions = require("../globalFuncAndVariables");

const saltRounds = 10;
const Joi = require("joi");
const router = express.Router();

// define Joi Scheme to validate the data
const URLTOMATCH = new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/);
const formJoiSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(12).required(),
	biz: Joi.boolean().required(),
	firstName: Joi.string().min(2).required(),
	lastName: Joi.string().min(2).required(),
	state: Joi.string().min(0),
	country: Joi.string().min(2).required(),
	city: Joi.string().min(2).required(),
	street: Joi.string().min(2).required(),
	houseNumber: Joi.number().integer().required(),
	zip: Joi.string().min(0),
	phone: Joi.string().min(10).required(),
	imgAlt: Joi.string().min(0),
	imgUrl: Joi.string().min(0),
});

router.post("/", async (req, res) => {
	try {
		// * validate user input
		let errorJoi = await functions.validateData(req.body, formJoiSchema);
		if (errorJoi) return res.status(400).send("Oops Error ❌: " + errorJoi.details[0].message);

		//*check if user exists in database
		let user = await User.findOne({ email: req.body.email });
		if (user) return res.status(400).send("Oops Error ❌: User already exists");

		//*add new user
		user = new User(req.body);
		user.password = await bcrypt.hash(user.password, saltRounds).catch((err) => err);
		let accessToken = await user.generateAuthToken();
		await user.save();
		return res.status(201).send({
			_id: user._id,
			biz: user.biz,
			token: accessToken,
		});
	} catch (error) {
		return res.status(400).send("error in register the user: " + error);
	}
});

module.exports = router;
