const express = require("express");
const auth = require('../middleware/auth')
const {cardMongooseSchema,Cards } = require("./addBizCard");
const router = express.Router()

router.delete('/:cardBizID',auth,async (req,res) => {
    let filter = {_id: req.params.cardBizID}
    FindAndDelete(filter,res)
})

async function FindAndDelete(filter,res) {
    let userData = await Cards.find(filter);
    if(userData.length > 0 && userData[0].userId.toString() === res.locals.user._id){
        return await Cards.deleteOne(filter,null,(err) => {
            if(err) return res.status(400).send('Oops Error ❌ Document not Deleted: ' + err)
            return res.status(200).send('Document Deleted ✅')
        }).clone()
    
    }else{
        if(userData.length === 0) return res.status(400).send('Oops Error ❌ Cannot find Document')
        return res.status(401).send('Oops Error ❌: Your are not unauthorized to see this data')
    }
}

module.exports = router

