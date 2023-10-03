const Admin = require("../model/staff/Admin");


const isAdmin = async ( req, res, next )=>{
 const userId = req.userAuth._id;
 const adminFound = await Admin.findById(userId);
 if(adminFound?.role === "admin"){
    next();
 }
if(adminFound?.role !== "admin"){
    next(new Error("access denied, admin only"));
}
};


module.exports = isAdmin;