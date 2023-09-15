//add module mongoose to connect and save data to database
const mongoose = require('mongoose');
const dbConnect = async () => {
    try {
    
       await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Connected Failed", error.message);
    }
};

dbConnect();