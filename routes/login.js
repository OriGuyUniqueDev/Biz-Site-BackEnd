const express = require("express");
const functions = require("../globalFuncAndVariables");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const _ = require("lodash");
const auth = require("../middleware/auth");
const Joi = require("joi");

const router = express.Router();

const formJoiSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(12).required(),
});

router.get("/", auth, async (req, res) => {
	try {
		//* search for the user in DB
		let userData = await User.findById(res.locals.user._id);
		// res.status(200).send(_.pick(userData, ["name", "email", "biz"]));
		res.status(200).send(userData);
	} catch (error) {
		return res.status(400).send("error in GET login: " + error);
	}
});

router.post("/", async (req, res) => {
	try {
		//* validate user input
		let errorJoi = await functions.validateData(req.body, formJoiSchema);
		if (errorJoi) return res.status(400).send(" " + errorJoi.details[0].message);

		//* serach and find the user
		let user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(404).send(` The user: ${req.body.email} not Found`);
		//* check passwords and return the data
		let isPassMatch = await bcrypt.compare(req.body.password, user.password).then((res) => res);
		if (!isPassMatch) return res.status(400).send(" " + "Email or Password is incorrect, try again 🤞🏼 ");

		let accessToken = await user.generateAuthToken();
		return res.status(200).send({
			_id: user._id,
			biz: user.biz,
			token: accessToken,
		});
	} catch (error) {
		return res.status(400).send("error in POST login: " + error);
	}
});

module.exports = router;
