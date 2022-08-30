const express = require("express");
const auth = require("../middleware/auth");
const {cardMongooseSchema,Cards } = require("./addBizCard");
const mongoose = require('mongoose')
const router = express.Router()

router.get('/:bizCardID',auth,async (req,res) => {
    let userData = await Cards.findById(req.params.bizCardID)
    if(userData.userId.toString() === res.locals.user._id){
        res.status(200).send(userData) 
    }else{
        res.status(401).send('Oops Error ❌: Your are not unauthorized to see this data')
    }
 })

 
module.exports = router