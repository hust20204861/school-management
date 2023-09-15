const bcrypt = require("bcryptjs");

const checkPass = async function(inputpass){
    return bcrypt.compare(process.env.secretpassword, inputpass)
    };
    module.exports = checkPass;