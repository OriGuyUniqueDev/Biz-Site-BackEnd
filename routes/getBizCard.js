const express = require("express");
const auth = require("../middleware/auth");
const Cards = require("../models/Card");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/:bizCardID", auth, async (req, res) => {
	try {
		let userData = await Cards.findById(req.params.bizCardID);
		if (userData.userId.toString() !== res.locals.user._id) return res.status(200).send(userData);
	} catch (error) {
		return res.status(401).send(" Your are not unauthorized to see this data");
	}
});

module.exports = router;
