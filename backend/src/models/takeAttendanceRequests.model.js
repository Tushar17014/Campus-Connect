import mongoose from "mongoose";

const TakeAttendanceRequestsSchema = new mongoose.Schema({
    requestId: { type: String, required: true, unique: true },
    enrolls: [{ type: Number }],
    cid: { type: String, required: true },
    status: { type: String, enum: ["pending", "processing", "completed", "failed"], default: "pending" },
    createdAt: { type: Date, default: Date.now }
});

export const TakeAttendanceRequests =  mongoose.model('TakeAttendanceRequests', TakeAttendanceRequestsSchema, 'TakeAttendanceRequests');
