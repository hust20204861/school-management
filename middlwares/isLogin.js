
const Admin = require("../model/staff/Admin");
const verifyToken = require("../utils/verifyToken");


const isLogin = async ( req, res, next )=>{
   //get token from header
   const headerObj = req.headers;
   const token = headerObj.authorization.split(" ")[1];
   //verify token
   const verifiedToken = verifyToken(token);
   if(!verifiedToken) {
      const err = new Error("Token is expired/invalid");
      next(err);
      return
   }
   const user = await Admin.findById(verifiedToken.id).select("name email role");
   req.userAuth = user; 
   next();

};


module.exports = isLogin;