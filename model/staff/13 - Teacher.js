const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dateEmployed: {
      type: Date,
      default: Date.now,
    },
    teacherId: {
      type: String,
      required: true,
      default: function () {
        return (
          "TEA" +
          Math.floor(100 + Math.random() * 900) +
          Date.now().toString().slice(2, 4) +
          this.name
            .split(" ")
            .map(name => name[0])
            .join("")
            .toUpperCase()
        );
      },
    },
    //if witdrawn, the teacher will not be able to login
    isWitdrawn: {
      type: Boolean,
      default: false,
    },
    //if suspended, the teacher can login but cannot perform any task
    isSuspended: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "teacher",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    applicationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    program: {
      type: String,
      ref: "Program",
      require: true,
    },
    //A teacher can teach in more than one class level
    classLevel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassLevel",
      require: true,
    },
    academicYear: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicYear",
      require: true,
    },
    examsCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exam",
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    academicTerm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AcademicTerm",
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
//hash password
teacherSchema.pre("save", async function (next) {  
  if(!this.isModified("password")){
    next();
  }
  //salt
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

//verifypassword
 teacherSchema.methods.verifyPassword = async function(enteredPassword){

  return await bcrypt.compare(enteredPassword, this.password);
  
};


//model
const Teacher = mongoose.model("Teacher", teacherSchema);

module.exports = Teacher;
