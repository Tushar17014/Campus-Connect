import mongoose from "mongoose";

const StudentEncodingsSchema = new mongoose.Schema({
  enroll: {type: Number, required: true},
  encoding: {type: Array, required: true}
});

export const StudentEncodings = mongoose.model('StudentEncodings', StudentEncodingsSchema, 'StudentEncodings');
