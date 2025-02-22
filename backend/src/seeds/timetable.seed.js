const TimetableData = {
    day: "Friday",
        timeSlots: [
            {
                time: 9,
                lectures: [
                    {
                        type: "LEC",
                        batch: ["B1", "B2"],
                        course: "672f25c94eb0f4c374ff46cf",
                        classroom: "CS2",
                        teacher: "672e732a6fd8770b5f324e53"
                    },
                    {
                        type: "LEC",
                        batch: ["B3", "B4"],
                        course: "672f25c94eb0f4c374ff46d1",
                        classroom: "CS3",
                        teacher: "672e732a6fd8770b5f324e53"
                    }
                ]
            },
            {
                time: 10,
                lectures: [
                    {
                        type: "LEC",
                        batch: ["B5", "B6"],
                        course: "672f25c94eb0f4c374ff46d2",
                        classroom: "CS2",
                        teacher: "67b758f154db1adaa2f32c82"
                    },
                    {
                        type: "LEC",
                        batch: ["B7", "B8"],
                        course: "672f25c94eb0f4c374ff46d3",
                        classroom: "CS3",
                        teacher: "672e732a6fd8770b5f324e53"
                    }
                ]
            },
            {
                time: 11,
                lectures: [
                    {
                        type: "LEC",
                        batch: ["B1", "B2"],
                        course: "672f25c94eb0f4c374ff46d4",
                        classroom: "CS2",
                        teacher: "67b758f154db1adaa2f32c82"
                    },
                    {
                        type: "LEC",
                        batch: ["B3", "B4"],
                        course: "672f25c94eb0f4c374ff46d5",
                        classroom: "CS3",
                        teacher: "67b758f154db1adaa2f32c82"
                    }
                ]
            },
            {
                time: 12,
                lectures: [] // Break time
            },
            {
                time: 13,
                lectures: [
                    {
                        type: "LEC",
                        batch: ["B5", "B6"],
                        course: "672f25c94eb0f4c374ff46cf",
                        classroom: "CS2",
                        teacher: "672e732a6fd8770b5f324e53"
                    },
                    {
                        type: "LEC",
                        batch: ["B7", "B8"],
                        course: "672f25c94eb0f4c374ff46d1",
                        classroom: "CS3",
                        teacher: "672e732a6fd8770b5f324e53"
                    }
                ]
            },
            {
                time: 14,
                lectures: [
                    {
                        type: "LEC",
                        batch: ["B1", "B2"],
                        course: "672f25c94eb0f4c374ff46d2",
                        classroom: "CS2",
                        teacher: "67b758f154db1adaa2f32c82"
                    },
                    {
                        type: "LEC",
                        batch: ["B3", "B4"],
                        course: "672f25c94eb0f4c374ff46d3",
                        classroom: "CS3",
                        teacher: "672e732a6fd8770b5f324e53"
                    }
                ]
            },
            {
                time: 15,
                lectures: [
                    {
                        type: "LEC",
                        batch: ["B5", "B6"],
                        course: "672f25c94eb0f4c374ff46d4",
                        classroom: "CS2",
                        teacher: "67b758f154db1adaa2f32c82"
                    },
                    {
                        type: "LEC",
                        batch: ["B7", "B8"],
                        course: "672f25c94eb0f4c374ff46d5",
                        classroom: "CS3",
                        teacher: "67b758f154db1adaa2f32c82"
                    }
                ]
            }
        ]
}

import mongoose from "mongoose"
import { config } from "dotenv";
import { Timetable } from "../models/timetable.model.js";

config();

const addTimetable = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    try {
        // Fetch all courses

        await Timetable.create(TimetableData);

        console.log("Update complete");
        mongoose.disconnect();
    } catch (err) {
        console.error("Error updating teacher field:", err);
        mongoose.disconnect();
    }
}

addTimetable();