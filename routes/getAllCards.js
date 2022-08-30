const express = require("express");
const auth = require("../middleware/auth");
const {cardMongooseSchema,Cards } = require("./addBizCard");
const router = express.Router()

router.get('/',auth,async (req,res) => {
    let cardData = await Cards.find()
    if(cardData.length > 0){
        res.status(200).send(cardData) 
    }else{
        return res.status(400).send('Oops Error ❌ Cannot find Document')
    }
 })


module.exports = router
