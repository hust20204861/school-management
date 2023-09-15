const express = require("express");

const { loginTeacherCtrl, updateTeacherCtrl, getTeacherProfileCtrl, adminCreateTeacher, teacherCreateExam } = require("../../controller/staff/teacherCtrl");
const isLoginTeacher = require("../../middlwares/isLoginTeacher");
const { adminUpdateTeacher } = require("../../controller/staff/adminCtrl");
const isLogin = require("../../middlwares/isLogin");
const isAdmin = require("../../middlwares/isAdmin");
const isTeacher = require("../../middlwares/isTeacher");

const teacherRouter = express.Router();


//login
teacherRouter.post("/login", loginTeacherCtrl);


//get single 
teacherRouter.get("/profile",isLoginTeacher,isTeacher, getTeacherProfileCtrl);

//update 
teacherRouter.put("/update", isLoginTeacher,isTeacher, updateTeacherCtrl);


teacherRouter.post("/exam/create",isLoginTeacher, isTeacher, teacherCreateExam);

module.exports = teacherRouter;