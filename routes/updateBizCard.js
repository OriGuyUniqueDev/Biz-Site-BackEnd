const express = require("express");
const {cardMongooseSchema,Cards } = require("./addBizCard");
const functions = require("../globalFuncAndVariables");
const Joi = require('joi')
const auth = require("../middleware/auth");
const { join } = require("lodash");
const router = express.Router()
const JoiUpdateCardSchema = Joi.object({
    bizName: Joi.string(),
    description : Joi.string(),
    address: Joi.string(),
    tel : Joi.string().regex(/^05\d{8}$/).min(9).max(10),
    img: Joi.string(),
})
router.put('/:cardBizID',auth ,async (req,res) => {
    let filter = {_id: req.params.cardBizID}
    let update = {}
    update[req.body.keyToUpdate] =  req.body.value
    validateFindAndUpdate(filter,update,res)
    

})

async function validateFindAndUpdate(filter,update,res) {
    let isValidated = await functions.validateData(update,res,JoiUpdateCardSchema)
    let userData = await Cards.find(filter);
    if(isValidated === undefined && userData[0].userId.toString() === res.locals.user._id){
        return await Cards.findOneAndUpdate(filter,update,{returnOriginal: false},(err,doc) => {
            if (err) return res.status(400).send('Document updated ❌: ' + err)
            return res.status(200).send('Document updated ✅: ' + doc)
        }).clone()
    }else{
        if (isValidated !== undefined) return res.status(400).send('Oops Error ❌: ' + isValidated.details[0].message)
        return res.status(401).send('Oops Error ❌: Your are not unauthorized to see this data')
    }
}

module.exports = router
