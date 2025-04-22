import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
    type: { type: String, required: true },
    batch: [{ type: String, required: true }],
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    classroom: { type: String, default: "CS1" },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true }
});

const TimeSlotSchema = new mongoose.Schema({
    time: { type: Number, required: true },
    lectures: [LectureSchema]
});

const TimetableSchema = new mongoose.Schema({
    day: { type: String, required: true },
    timeSlots: [TimeSlotSchema]
});

// const TimetableSchema = new mongoose.Schema({
//     sem: { type: Number, required: true },
//     schedule: [DayScheduleSchema]
// });

export const Timetable = mongoose.model("Timetable", TimetableSchema, "Timetable");
