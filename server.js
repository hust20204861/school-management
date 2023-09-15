require("dotenv").config();
//create module http 
const http = require('http');
//connect db to server
require("./config/dbConnect");
//create module app with router to connect to server
const app = require("./app/app");

const PORT = process.env.PORT || 2023;

//server
//connect app to server
const server = http.createServer(app);
//khởi động server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));


