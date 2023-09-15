const Teacher = require("../model/staff/13 - Teacher");
const verifyToken = require("../utils/verifyToken");


const isLoginTeacher = async ( req, res, next )=>{
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
   const user = await Teacher.findById(verifiedToken.id).select("name email role");
   req.userAuth = user; 
   console.log(req.userAuth)
   next();
};


module.exports = isLoginTeacher;