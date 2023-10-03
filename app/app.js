//add modules 
const express = require("express");
const morgan = require("morgan");
//connect to others module by router to use
const adminRouter = require("../routes/staff/adminRouter");
const {globalErrHandler, notFoundErr} = require("../middlwares/globalErrHandler");
const teacherRouter = require("../routes/staff/teacherRouter");
const studentRouter = require("../routes/academics/studentRouter");
//khởi tạo app mới dùng module express 
const app = express();

//middlewares
app.use(morgan("dev"));

//pass incoming json data
app.use(express.json());

//routes
app.use("/api/v1/teacher", teacherRouter);
app.use("/api/v1/student", studentRouter);
app.use('/api/v1/admins', adminRouter);


app.use(notFoundErr);
app.use(globalErrHandler);




module.exports = app;