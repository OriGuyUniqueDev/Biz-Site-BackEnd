const express = require("express");
const Cards = require("../models/Card");
const functions = require("../globalFuncAndVariables");
const Joi = require("joi");
const auth = require("../middleware/auth");
const router = express.Router();
const JoiUpdateCardSchema = Joi.object({
	bizName: Joi.string().min(2).max(30),
	bizField: Joi.string().min(2).max(30),
	state: Joi.string().min(0).max(30),
	country: Joi.string().min(2).max(30),
	city: Joi.string().min(2).max(30),
	street: Joi.string().min(2).max(30),
	houseNumber: Joi.number().integer(),
	imgUrl: Joi.string().min(10),
	imgAlt: Joi.string().min(2),
	phone: Joi.string().min(10),
	likes: Joi.array(),
});
router.put("/:cardBizID", auth, async (req, res) => {
	try {
		//* info to update
		let filter = { _id: req.params.cardBizID };
		let update = req.body;

		//* validate user input
		let errorJoi = await functions.validateData(update, JoiUpdateCardSchema);
		if (errorJoi) return res.status(400).send(" " + errorJoi.details[0].message);

		//* check if card exist
		let card = await Cards.find(filter);
		if (card.length === 0) return res.status(400).send(" Document not updated - cannot find document");

		//* card exist - update data
		return await Cards.findOneAndUpdate(filter, update, { returnOriginal: false })
			.then((doc) => res.status(200).send("Document updated ✅ "))
			.catch((err) => res.status(400).send(" Document not updated : " + err));
	} catch (error) {
		return res.status(400).send("error in update document: " + error);
	}
});

module.exports = router;
