const express = require("express");


const { loginStudentCtrl, getStudentProfileCtrl, updateStudentCtrl } = require("../../controller/academics/studentCtrl");
const isLoginStudent = require("../../middlwares/isLoginStudent");

const studentRouter = express.Router();


//login
studentRouter.post("/login", loginStudentCtrl);

//get single 
studentRouter.get("/profile",isLoginStudent, getStudentProfileCtrl);

//update 
//studentRouter.put("/update", updateStudentCtrl);





module.exports = studentRouter;