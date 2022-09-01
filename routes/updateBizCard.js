const express = require("express");
const Cards = require("../models/Card");
const functions = require("../globalFuncAndVariables");
const Joi = require("joi");
const auth = require("../middleware/auth");
const router = express.Router();
const JoiUpdateCardSchema = Joi.object({
	bizName: Joi.string(),
	description: Joi.string(),
	address: Joi.string(),
	tel: Joi.string()
		.regex(/^05\d{8}$/)
		.min(9)
		.max(10),
	img: Joi.string(),
});
router.put("/:cardBizID", auth, async (req, res) => {
	try {
		//* info to update
		let filter = { _id: req.params.cardBizID };
		let update = {};
		update[req.body.keyToUpdate] = req.body.value;

		//* validate user input
		let errorJoi = await functions.validateData(update, JoiUpdateCardSchema);
		if (errorJoi) return res.status(400).send("Oops Error ❌: " + errorJoi.details[0].message);

		//* check if card exist
		let card = await Cards.find(filter);
		if (card.length === 0) return res.status(400).send("Oops Error ❌: Document not updated - cannot find document");

        //* check if values are the same
        if(card[0][req.body.keyToUpdate] === req.body.value) return res.status(400).send("Oops Error ❌: Nothing to update the values are the same")

		//* card exist - update data
		return await Cards.findOneAndUpdate(filter, update, { returnOriginal: false })
			.then((doc) => res.status(200).send("Document updated ✅: " + doc))
			.catch((err) => res.status(400).send("Oops Error ❌: Document not updated : " + err));
	} catch (error) {
        return res.status(400).send("error in update document: " + error);
    }
});



module.exports = router;
