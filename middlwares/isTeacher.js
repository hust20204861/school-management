const Teacher = require("../model/staff/13 - Teacher");


const isTeacher = async ( req, res, next )=>{
 const userId = req.userAuth._id;
 const teacherFound = await Teacher.findById(userId);
 if(teacherFound?.role === "teacher"){
    next();
 }
if(teacherFound?.role !== "teacher"){
    next(new Error("access denied, teacher only"));
}
};


module.exports = isTeacher;