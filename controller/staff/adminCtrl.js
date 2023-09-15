const AsyncHandler = require("express-async-handler");
const Admin = require("../../model/staff/Admin");
const generateToken = require("../../utils/generateToken");
const verifyToken = require("../../utils/verifyToken");
const Teacher = require("../../model/staff/13 - Teacher");
const Student = require("../../model/academic/14 - Student");
const Subject = require("../../model/academic/8 - Subject");



//@desc register admin
//@route POST/api/admins/register
//@acess private
exports.registerAdminCtrl =  AsyncHandler(async (req, res)=>{
    const { name, 
            email, 
            password } = req.body;
        //check if email exists
        const adminFound = await Admin.findOne({ email });
       if(adminFound){
        throw new Error("Admin Exists");
       }
        //register
        const user = await Admin.create({
            name,
            email,
            password,
        });
 
    res.status(201).json({
        status: "success",
        data: user,
    });
    res.json({
        status: "failed",
        error: error.message,
    });
});

//@desc login admin
//@route POST/api/admins/login
//@acess private
exports.loginAdminCtrl = AsyncHandler(async (req, res)=>{
    const { email, password } = req.body;

        //find user
        const user = await Admin.findOne({ email });
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
//@desc login admin
//@route POST/api/admins/register
//@acess private
exports.getAdminsCtrl = (req, res)=>{
    try {
        
        res.status(201).json({
        status: "success",
        data: "All admins",
    });
} catch (error) {
    res.json({
        status: "failed",
        error: error.message,
    });
    
}
};
//@desc get single admin
//@route GET/api/admins/:id
//@acess private
exports.getAdminProfileCtrl = AsyncHandler( async (req, res) =>{
const admin = await Admin.findById(req.userAuth._id).select("-password -createAt -updateAt");
if(!admin){
throw new Error("Admin not found");
}
res.status(200).json({
status: "succcess",
data: admin,
})
})
//@desc update admin
//@route PUT/api/admins/:id
//@acess private
exports.updateAdminCtrl = AsyncHandler( async (req, res)=>{
    const { email, password, name} = req.body;
    const adminExist = await Admin.findOne({email});
    if(adminExist){
        throw new Error("This account have been taken");
    }
    const admin = await Admin.findByIdAndUpdate(req.userAuth._id, {
        email,
        password,
        name
    },
    {
        new: true,
        runValidators: true,
    }
    );
    res.status(201).json({
        status: "success",
        data: admin,
    });

    res.json({
        status: "failed",
        error: error.message,
    });
    

});
//@desc delete admin
//@route DELETE/api/admins/:id
//@acess private
exports.deleteAdminCtrl = (req, res)=>{
    try {
    res.status(201).json({
        status: "success",
        data: "delete admin",
    });
} catch (error) {
    res.json({
        status: "failed",
        error: error.message,
    });
    
}
};
//@desc admin suspend a teacher
//@route PUT/api/admins/suspend/teacher/:id
//@acess private
exports.adminSuspendTeacher = (req, res)=>{
    try {
    res.status(201).json({
        status: "success",
        data: "admin suspend teacher",
    });
} catch (error) {
    res.json({
        status: "failed",
        error: error.message,
    });
    
}
};
//@desc admin unsuspend a teacher
//@route PUT/api/admins/unsuspend/teacher/:id
//@acess private
exports.adminUnsuspendTeacher = (req, res)=>{
    try {
        res.status(201).json({
            status: "success",
            data: "admin unsuspend teacher",
        });
    } catch (error) {
        res.json({
            status: "failed",
            error: error.message,
        });
        
    }
};
//@desc admin withdraw a teacher
//@route PUT/api/admins/withdraw/teacher/:id
//@acess private
exports.adminWithdrawTeacher = (req, res)=>{
    try {
    res.status(201).json({
        status: "success",
        data: "admin withdraw teacher",
    });
} catch (error) {
    res.json({
        status: "failed",
        error: error.message,
    });
    
}
};
//@desc admin unwithdraw a teacher
//@route PUT/api/admins/unwithdraw/teacher/:id
//@acess private
exports.adminUnwithdrawTeacher = (req, res)=>{
    try {
    res.status(201).json({
        status: "success",
        data: "admin unwithdraw teacher",
    });
} catch (error) {
    res.json({
        status: "failed",
        error: error.message,
    });
    
}
};
//@desc publish exam results
//@route PUT/api/admins/publish/exam/:id
//@acess private
exports.adminPublishResults = (req, res)=>{
    try {
    res.status(201).json({
        status: "success",
        data: "admin publish exam",
    });
} catch (error) {
    res.json({
        status: "failed",
        error: error.message,
    });
    
}
};
//@desc unpublish exam results
//@route PUT/api/admins/unpublish/exam/:id
//@acess private
exports.adminUnpublishResults = (req, res)=>{
    try {
    res.status(201).json({
        status: "success",
        data: "admin unpublish exam",
    });
} catch (error) {
    res.json({
        status: "failed",
        error: error.message,
    });
    
}
};

//create teacher
exports.adminCreateTeacher =  AsyncHandler(async (req, res)=>{
    const {  
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
        //check if email exists
        const teacherFound = await Teacher.findOne({ email });
       if(teacherFound){
        throw new Error("Teacher Exists");
       }
        //register
        const user = await Teacher.create({
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
        });

 
    res.status(201).json({
        status: "success",
        data: user,
    });
    res.json({
        status: "failed",
        error: error.message,
    });
});

exports.adminGetTeacher =  AsyncHandler(async (req, res)=>{
   
        const teacherFound = await Teacher.find();

 
    res.status(201).json({
        status: "success",
        data: teacherFound,
    });
    res.json({
        status: "failed",
        error: error.message,
    });
});

//admin get singleteacher
exports.adminGetaTeacher = AsyncHandler( async (req, res, next) => {
    const teacherID = req.params.teacherID;
   
    const teacher = await Teacher.findById(teacherID);
    if(!teacher){
        throw new Error("Teacher not found");
    }
    res.status(200).json({
        status: "success",
        data: teacher,
    });
    res.json({
        status: "failed",
        error: error.message,
        });
})
//update teacher
 exports.adminUpdateTeacher = AsyncHandler( async (req, res)=>{
    
    const {
        subject,
        program,
        classLevels,
        academicTerm,
        academicYear,
       } = req.body;
const teacherFound = await Teacher.findById(req.params.teacherID);

if(teacherFound){
  teacherFound.program = program;
  await teacherFound.save();
   res.status(201).json({
    status: "success",
    data: teacherFound,
    });
    res.json({
    status: "failed",
    error: error.message,
    });

    teacherFound.subject = subject;
  await teacherFound.save();
    res.status(201).json({
    status: "success",
    data: teacherFound,
    });
    res.json({
    status: "failed",
    error: error.message,
    });

    teacherFound.classLevels = classLevels;
  await teacherFound.save();
    res.status(201).json({
    status: "success",
    data: teacherFound,
    });
    res.json({
    status: "failed",
    error: error.message,
    });

    teacherFound.academicYear = academicYear;
  await teacherFound.save();
    res.status(201).json({
    status: "success",
    data: teacherFound,
    });
    res.json({
    status: "failed",
    error: error.message,
    });

    teacherFound.academicTerm = academicTerm;
  await teacherFound.save();
    res.status(201).json({
    status: "success",
    data: teacherFound,
    });
    res.json({
    status: "failed",
    error: error.message,
    });
    
}



});


//create student
exports.adminCreateStudent =  AsyncHandler(async (req, res)=>{
    const {  name,
    email,
    password,
    studentId,
    classLevels,
    yearGraduated,
    program,
    academicYear,
} = req.body;
        //check if email exists
        const studentFound = await Student.findOne({ email });
       if(studentFound){
        throw new Error("Student Exists");
       }
        //register
        const student = await Student.create({
            name,
            email,
            password,
            studentId,
            classLevels,
            yearGraduated,
            program,
            academicYear,
        });
 console.log(student)
    res.status(201).json({
        status: "success",
        data: student,
    });
    res.json({
        status: "failed",
        error: error.message,
    });
});
//admin get student
exports.adminGetStudent =  AsyncHandler(async (req, res)=>{
   
    const studentFound = await Student.find();

res.status(201).json({
    status: "success",
    data: studentFound,
});
res.json({
    status: "failed",
    error: error.message,
});
});

exports.adminGetaStudent = AsyncHandler( async (req, res, next) => {
    const studentID = req.params.stuedntID;
   
    const student = await Student.findById(studentID);
    if(!student){
        throw new Error("Student not found");
    }
    res.status(200).json({
        status: "success",
        data: student,
    });
    res.json({
        status: "failed",
        error: error.message,
        });
})
//update teacher
 exports.adminUpdateStudent = AsyncHandler( async (req, res)=>{
    
    const {
        classLevels,
        yearGraduated,
        program,
        academicYear,
       } = req.body;
const studentFound = await Student.findById(req.params.studentID);
console.log(studentFound)
if(studentFound){
  studentFound.program = program;
  await studentFound.save();
  return res.status(201).json({
    status: "success",
    data: studentFound,
    });
    res.json({
    status: "failed",
    error: error.message,
    });
    
}



});
//admin create subject
exports.adminCreateSubject =  AsyncHandler(async (req, res)=>{
    const {  
    name,
    description,
    duration,
    academicTerm,
    teacher,
    createdBy,
} = req.body;
        //register
        const subject = await Subject.create({
            name,
            description,
            duration,
            academicTerm,
            teacher,
            createdBy,
        });

 
    res.status(201).json({
        status: "success",
        data: user,
    });
    res.json({
        status: "failed",
        error: error.message,
    });
});



