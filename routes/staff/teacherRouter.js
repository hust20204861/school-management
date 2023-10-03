const express = require("express");

const { loginTeacherCtrl, updateTeacherCtrl, getTeacherProfileCtrl, teacherCreateExam, teacherCreateCalendar } = require("../../controller/staff/teacherCtrl");
const isLoginTeacher = require("../../middlwares/isLoginTeacher");

const isTeacher = require("../../middlwares/isTeacher");
const teacherRouter = express.Router();

//login
teacherRouter.post("/login", loginTeacherCtrl);

//get single 
teacherRouter.get("/profile",isLoginTeacher,isTeacher, getTeacherProfileCtrl);

//update 
teacherRouter.put("/update", isLoginTeacher,isTeacher, updateTeacherCtrl);

//teacher create exam
teacherRouter.post("/exam/create",isLoginTeacher, isTeacher, teacherCreateExam);

//teacher create calendar
teacherRouter.post("/calendar/create", isLoginTeacher, isTeacher, teacherCreateCalendar);

module.exports = teacherRouter;