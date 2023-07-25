 const bcrypt = require("bcrypt");
 const User = require("../models/User");

const register = async (req, res, next) => {
    try{
        const {username, email, password} = req.body;
        let user = await User.register({username, email, password});
        return res.json({status:true, user})
    }catch(err){
        return next(err);
    }

}

const login = async (req, res, next) => {
    try{
        const {username, password} = req.body;
        let user = await User.get(username);
        if(!user){
            console.log("no user");
            return res.json({msg:"Incorrect username/password", status:false})
        }
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid){
            console.log("invalid password");
            return res.json({msg:"Incorrect username/password", status:false})
        }
        delete user.password;
        return res.json({status:true, user})
    }catch(err){
        return next(err);
    }

}

module.exports = {
    register,
    login
}