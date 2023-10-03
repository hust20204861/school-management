const AsyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const Student = require("../../model/academic/14 - Student");



//@desc login admin
//@route POST/api/student/login
//@acess private
exports.loginStudentCtrl = AsyncHandler(async (req, res)=>{
    const { email, password } = req.body;

        //find user
        const user = await Student.findOne({ email });
   
        if(!user){
            return res.json({message : "Invliad login crendentials"});
        }
      
        if(user && (await user.verifyPassword(password))){
            const token = generateToken(user._id);
            const verify = verifyToken(token);
            return res.json({ data : generateToken(user._id), user, verify});
        }
        else{
            return res.json({ message : "Invliad login crendentials"});
        }; 
    
    res.json({
        status: "failed",
        error: error.message,
    });
});

//@desc get single admin
//@route GET/api/admins/:id
//@acess private
exports.getStudentProfileCtrl = AsyncHandler( async (req, res) =>{

const student = await Student.findById(req.userAuth._id);
if(!student){
throw new Error("Student not found");
}
res.status(200).json({
status: "succcess",
data: student,
})
})
//@desc update admin
//@route PUT/api/admins/:id
//@acess private
// exports.updateStudentCtrl = AsyncHandler( async (req, res)=>{
//     const {  name,
//         email,
//         password,
//         studentId,
//         classLevels,
//         yearGraduated,
//         program,
//         academicYear,} = req.body;
//     const studentExist = await Student.findOne({email});
//     if(studentExist){
//         throw new Error("This account have been taken");
//     }
    
//     const student = await Student.findByIdAndUpdate(req.userAuth._id, {
//             name,
//             email,
//             password,
//             studentId,
//             classLevels,
//             yearGraduated,
//             program,
//             academicYear,
//     },
//     {
//         new: true,
//         runValidators: true,
//     }
//     );
//     res.status(201).json({
//         status: "success",
//         data: student,
//     });

//     res.json({
//         status: "failed",
//         error: error.message,
//     });
    

// });

