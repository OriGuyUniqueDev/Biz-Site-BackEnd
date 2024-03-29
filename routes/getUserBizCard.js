const express = require("express");
const auth = require("../middleware/auth");
const Cards = require("../models/Card");
const router = express.Router();

router.get("/:userID", auth, async (req, res) => {
	try {
		let filter = { userId: req.params.userID };
		filter;
		let cards = await Cards.find(filter);
		//* card not found
		if (cards.length === 0) return res.status(400).send(" Document not found");
		//* get the cards
		return res.status(200).send(cards);
	} catch (error) {
		return res.status(400).send("error in GET user business card: " + error);
	}
});

module.exports = router;
