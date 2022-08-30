
async function validateData(jsonData,res,schema) {
	// validate with Joi the input
	const { error, value } = schema.validate(jsonData);
	    //check for errors and respond
	if (error) return error
}
async function generateToken(jsonData,res,schema) {
	// validate with Joi the input
	const { error, value } = schema.validate(jsonData);
	    //check for errors and respond
	if (error) return error
}


module.exports = {
    validateData: validateData,
    generateToken: generateToken
}