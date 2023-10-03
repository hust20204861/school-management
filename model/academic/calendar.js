const mongoose = require("mongoose");

const { Schema } = mongoose;
//create new schema
const CalendarSchema = new Schema(
  {
    Monday: {
      type: String,
      timebegin: Date,
      timefinish: Date,
      required: true,
    },
    Tuesday: {
      type: String,
      timebegin: Date,
      timefinish: Date,
      required: true,
    },
    Wednesday: {
        type: String,
        timebegin: Date,
      timefinish: Date,
        required: true,
      },
      Thursday: {
        type: String,
        timebegin: Date,
      timefinish: Date,
        required: true,
      },
      Friday: {
        type: String,
        timebegin: Date,
      timefinish: Date,
        required: true,
      },
      Saturday: {
        type: String,
        timebegin: Date,
      timefinish: Date,
        required: true,
      },
      Sunday: {
        type: String,
        timebegin: Date,
      timefinish: Date,
        required: true,
      },
   
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
 
    
  },
  { timestamps: true }
);
//create model to crud
const Calendar = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendar;
