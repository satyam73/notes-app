const jwt = require("jsonwebtoken");
const userModel = require("../models/model");

const auth = async (req, res, next) => {
    try{
        const token =req.cookies.notesapp;
        const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
        const user =  await userModel.findOne({_id: verifyUser._id});
        req.token = token;
        req.user = user;
        next()
    }catch(err){
       console.log(err.message);
       res.status(401).send(err);
    }
}

module.exports = auth;