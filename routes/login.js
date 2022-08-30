const express = require("express");
const functions = require("../globalFuncAndVariables");
const bcrypt = require('bcrypt');
const {User} = require('./register')
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const auth = require('../middleware/auth')

const router = express.Router()
const Joi = require("joi");

const formJoiSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required()
})

router.get('/',auth,async (req,res) => {
   let userData = await User.findById(res.locals.user._id)
   res.status(200).send(_.pick(userData,['name','email','biz'])) 
})

router.post('/',async (req,res) => {
    let isValidated = await functions.validateData(req.body,res,formJoiSchema)
    let user = await User.find({email: req.body.email})

    if (isValidated === undefined && user.length !== 0) {
         await validateDataForLogin(req.body,user[0],res)
      
    }else{
       
        res.status(400).send('Oops Error ❌: ' + 'We cant find the user: ' + req.body.email); 
    }
})

async function validateDataForLogin(jsonData,user,res) {

    let isPassMatch = await bcrypt.compare(jsonData.password,user.password).then(res => res)

    if (!isPassMatch) return res.status(400).send('Oops Error ❌: ' + 'Email or Password is incorrect, try again 🤞🏼 '); 

    let accessToken = await user.generateAuthToken()

    res.status(200).json(
        {
            _id: user._id,
            biz: user.biz,
            token: accessToken
        }
    )


   
}


module.exports =  router
