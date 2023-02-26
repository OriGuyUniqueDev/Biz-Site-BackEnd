const express = require("express");
const Cards = require("../models/Card");
const functions = require("../globalFuncAndVariables");
const Joi = require("joi");
const auth = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();
const JoiUpdateCardSchema = Joi.object({
	email: Joi.string().email(),
	password: Joi.string().min(6).max(12),
	biz: Joi.boolean(),
	firstName: Joi.string().min(2),
	lastName: Joi.string().min(2),
	state: Joi.string().min(0),
	country: Joi.string().min(2),
	city: Joi.string().min(2),
	street: Joi.string().min(2),
	houseNumber: Joi.number().integer(),
	zip: Joi.string().min(0),
	phone: Joi.string().min(10),
	imgAlt: Joi.string().min(0),
	imgUrl: Joi.string().min(0),
	favBiz: Joi.array(),
});
router.put("/:userID", auth, async (req, res) => {
	try {
		//* info to update
		let filter = { _id: req.params.userID };
		let update = req.body;

		//* validate user input
		let errorJoi = await functions.validateData(update, JoiUpdateCardSchema);
		if (errorJoi) return res.status(400).send(" " + errorJoi.details[0].message);

		//* check if card exist
		let card = await User.find(filter);
		if (card.length === 0) return res.status(400).send(" Document not updated - cannot find document");

		//* card exist - update data
		return await User.findOneAndUpdate(filter, update, { returnOriginal: false })
			.then((doc) => res.status(200).send("Document updated ✅"))
			.catch((err) => res.status(400).send(" Document not updated : " + err));
	} catch (error) {
		return res.status(400).send("error in update document: " + error);
	}
});

module.exports = router;
