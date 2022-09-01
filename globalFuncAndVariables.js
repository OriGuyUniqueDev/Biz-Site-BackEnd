
async function validateData(jsonData,schema) {
	try {
		// validate with Joi the input
		const { error, value } = schema.validate(jsonData);
		//check for errors and respond
		if (error) return error;
	} catch (error) {
		return error
	}
}


module.exports = {
    validateData: validateData,
}