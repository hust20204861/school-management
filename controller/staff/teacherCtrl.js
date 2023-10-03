const AsyncHandler = require("express-async-handler");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const Teacher = require("../../model/staff/13 - Teacher");
const Calendar = require("../../model/academic/calendar");





//@desc login admin
//@route POST/api/admins/login
//@acess private
exports.loginTeacherCtrl = AsyncHandler(async (req, res)=>{
    const { email, password } = req.body;

        //find user
        const user = await Teacher.findOne({ email });
        if(!user){
            return res.json({message : "Invliad login crendentials"});
        }

        if(user && (await user.verifyPassword(password))){

        const token = generateToken(user._id);
       
        const verify = verifyToken(token);
    
          return res.json({ data : generateToken(user._id)});
        }
        else{
            return res.json({ message : "Invliad login crendentials"});
        }; 
    
});

//@desc get single admin
//@route GET/api/admins/:id
//@acess private
exports.getTeacherProfileCtrl = AsyncHandler( async (req, res) =>{

const teacher = await Teacher.findById(req.userAuth._id);
if(!teacher){
throw new Error("Teacher not found");
}
// const teacherID = req.params.teacherId;
// console.log(teacherID)
res.status(200).json({
status: "succcess",
data: teacher,
})
})

//@desc update admin
//@route PUT/api/admins/:id
//@acess private
exports.updateTeacherCtrl = AsyncHandler( async (req, res)=>{
    const  { 
        name,
        email,
        password,
        dateEmployed,
        teacherId,
        subject,
        program,
        classLevel,
        academicTerm,
        academicYear,
        createdBy,
        } = req.body;

    const teacherExist = await Teacher.findOne({email});
    if(teacherExist){
        throw new Error("This account have been taken");
    }

    const teacher = await Teacher.findByIdAndUpdate(req.userAuth._id, {
        name,
        email,
        password,
        dateEmployed,
        teacherId,
        subject,
        program,
        classLevel,
        academicTerm,
        academicYear,
        createdBy,
    },
    {
        new: true,
        runValidators: true,
    }
    );
    console.log(teacher)
    res.status(201).json({
        status: "success",
        data: teacher,
    });
  
    res.json({
        status: "failed",
        error: error.message,
    });
    
  
});

exports.teacherCreateExam =  AsyncHandler(async (req, res)=>{
    const { 
        name,
        description,
        subject,
        program,
        passMark,
        totalMark,
        duration,
        examDate,
        academicTerm,
        examTime,
        examType,
        examStatus,
        classLevel,
        createdBy,
        academicYear,
} = req.body;
        //check if email exists
        const teacherFound = await Teacher.findOne({ email });
       if(teacherFound){
        throw new Error("Teacher Exists");
       }
        //register
        const exam = await Teacher.create({
            name,
            description,
            subject,
            program,
            passMark,
            totalMark,
            duration,
            examDate,
            academicTerm,
            examTime,
            examType,
            examStatus,
            classLevel,
            createdBy,
            academicYear,
        });

 
    res.status(201).json({
        status: "success",
        data: exam,
    });
    res.json({
        status: "failed",
        error: error.message,
    });
});

exports.teacherCreateCalendar = AsyncHandler( async (req, res) =>{
    const {
    Monday,
    Tuesday,
    Wednesday,
    Thusrday,
    Friday,
    Saturday,
    Sunday
    } = req.body;
    const calendar = await Teacher.create({
        Monday,
        Tuesday,
        Wednesday,
        Thusrday,
        Friday,
        Saturday,
        Sunday
    });
    res.status(201).json({
        status : "success",
        data: calendar,
    });
    res.json({
        status: "failed",
        error: error.message,
    });
})