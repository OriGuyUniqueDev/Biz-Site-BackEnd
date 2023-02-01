const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const functions = require("../globalFuncAndVariables");

const saltRounds = 10;
const Joi = require("joi");
const router = express.Router();

// define Joi Scheme to validate the data
const formJoiSchema = Joi.object({
	name: Joi.string().min(2).max(30).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(12).required(),
	biz: Joi.boolean().required(),
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
