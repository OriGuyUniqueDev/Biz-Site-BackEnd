const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const config = require('config')
var jwt = require('jsonwebtoken');

const saltRounds = 10;
const Joi = require("joi");
const router = express.Router();

// define Joi Scheme to validate the data
const formJoiSchema = Joi.object({
	name: Joi.string().min(2).max(12).required(),
	email: Joi.string().email().required(),
	password: Joi.string().min(6).max(12).required(),
    biz: Joi.boolean().required()
});
// define mongoose Scheme 
const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
	},
	biz: {
		type: Boolean,
		required: false,
	},
});
// add method to schema to add token to user documents
schema.methods.generateAuthToken = async function () {
    const token = await jwt.sign({_id : this._id, biz : this.biz},config.get("jwtKey"))

    return token
}
const User = new mongoose.model("users", schema);


router.post("/", async (req, res) => {
	// validate user input
	let isValidated = await validateData(req.body,res)

	if (isValidated === undefined) {
		// create the user document and hash the password
		let user = await createUserDocument(req.body)  
		// check if the user exist in the database, generate token and add the user if needed
		await checkDatabaseAddUser(req.body,user,res)   
	} else {
		res.status(400).send('Oops Error ❌: ' + isValidated.details[0].message); 
	}
});

async function validateData(jsonData,res) {
	// validate with Joi the input
	const { error, value } = formJoiSchema.validate(jsonData);
	    //check for errors and respond
	if (error) return error
}
async function createUserDocument(jsonData) {
	 //creates the user
	 let userToAdd = jsonData;
	 // hash the password
 	let hashedPassword = await bcrypt.hash(userToAdd.password, saltRounds).then(res => res).catch(err =>err);
 	userToAdd.password = hashedPassword
	 //create  the document
 	return  new User(userToAdd);

}
async function checkDatabaseAddUser(jsonData,user,res) {
	       // search for the user in the DB
		   let dbResult = await User.find({ email: jsonData.email });
		   // empty array  = user not exist so add to DB
		   // array with obj = user as been found with the given email
	   if (dbResult.length !== 0) {
		   res.status(400).send('Oops Error ❌: '+ dbResult[0].email + " already exists");
	   } else {
		   let accessToken = await user.generateAuthToken()
		   user
		   .save()
		   .then((result) => result)
		   .catch((err) => res.status(400).send('Oops Error ❌:' + err));
		   res.status(201).send(
			   {
				   _id: user._id,
				   biz: user.biz,
				   token: accessToken
			   }
		   )
	   }
}

module.exports = {
	router,User
};
