const express = require("express");
const auth = require('../middleware/auth')
const {cardMongooseSchema,Cards } = require("./addBizCard");
const router = express.Router()

router.get('/:userID',auth,async (req,res) => {
    let filter = {userId: req.params.userID}
    let cards = await Cards.find(filter)

    if(res.locals.user._id !== filter.userId) return res.status(401).send('Oops Error ❌: Your are not unauthorized to see this data')
    return res.status(200).send('Documents retrieved ✅: ' + cards)


  
})


module.exports = router
