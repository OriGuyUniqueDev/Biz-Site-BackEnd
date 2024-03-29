const express = require("express");
const auth = require("../middleware/auth");
const Cards = require("../models/Card");
const router = express.Router();

router.delete("/:cardBizID", auth, async (req, res) => {
	try {
		let filter = { _id: req.params.cardBizID };
		//* find the card to delete
		let card = await Cards.find(filter);
		//* card not found
		if (card.length === 0) return res.status(400).send("Oops Error ❌ Document not Deleted - cannot find document");
		//* delete the document
		if (req.user._id === card[0].userId?.toString()) {
			return await Cards.findOneAndDelete(filter)
				.then(() => res.status(200).send("Document Deleted ✅"))
				.catch((err) => res.status(400).send("Oops Error ❌ Document not Deleted: " + err));
		} else {
			throw "❌ Your not allowed to delete this card";
		}
	} catch (error) {
		return res.status(400).send("error in Delete document: " + error);
	}
});

module.exports = router;
