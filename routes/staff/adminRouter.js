const express = require("express");
const { registerAdminCtrl, loginAdminCtrl, getAdminsCtrl, getAdminProfileCtrl, updateAdminCtrl, deleteAdminCtrl, adminSuspendTeacher, adminUnsuspendTeacher, adminWithdrawTeacher, adminUnwithdrawTeacher, adminPublishResults, adminUnpublishResults, adminCreateTeacher, adminUpdateTeacher, adminCreateStudent, adminGetTeacher, adminGetaTeacher, adminGetStudent, adminUpdateStudent, adminGetaStudent } = require("../../controller/staff/adminCtrl");
const isLogin = require("../../middlwares/isLogin");
const isAdmin = require("../../middlwares/isAdmin");

const adminRouter = express.Router();


//register
adminRouter.post("/register", registerAdminCtrl);
//login
adminRouter.post("/login", loginAdminCtrl);
//get all admins
adminRouter.get("/",isLogin,isAdmin, getAdminsCtrl);
//get single admins
adminRouter.get("/profile",isLogin,isAdmin, getAdminProfileCtrl);
//update admin
adminRouter.put("/update", isLogin, updateAdminCtrl);
//delete admin
adminRouter.delete("/:id", deleteAdminCtrl);
//suspend
adminRouter.put("/suspend/teacher/:id", adminSuspendTeacher);
//unsuspend
adminRouter.put("/unsuspend/teacher/:id", adminUnsuspendTeacher);
//withdraw
adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacher);
//unwithdraw
adminRouter.put("/unwithdraw/teacher/:id", adminUnwithdrawTeacher);
//publish
adminRouter.put("publish/exam/:id", adminPublishResults);
//unpublish
adminRouter.put("/unpublish/exam/:id", adminUnpublishResults);



//create teacher
adminRouter.post("/teacher/create", isLogin, isAdmin, adminCreateTeacher);
//get all teacher
adminRouter.get("/teacher/all", isLogin, isAdmin, adminGetTeacher);
//update teacher
adminRouter.put("/:teacherID/update", isLogin, isAdmin, adminUpdateTeacher);
//admin get a teacher
adminRouter.get("/:teacherID", isLogin, isAdmin, adminGetaTeacher );



//create student
adminRouter.post("/student/create", adminCreateStudent);
//get all student
adminRouter.get("/student/all", isLogin, isAdmin, adminGetStudent);
//update student
adminRouter.put("/:studentID/update", isLogin, isAdmin, adminUpdateStudent);
//admin get a teacher
adminRouter.get("/:studentID", isLogin, isAdmin, adminGetaStudent );

module.exports = adminRouter;