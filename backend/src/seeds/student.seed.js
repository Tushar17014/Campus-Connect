import mongoose from "mongoose"
import { config } from "dotenv";
import { Courses } from "../models/courses.model.js";
import { StudentData } from "../models/studentData.model.js";

config();

const allStudents = [{
    "_id": {
        "$oid": "672f680903ae1392f0c6ac97"
    },
    "enroll": 1001,
    "name": "Aarav Sharma",
    "gender": "Female",
    "dob": {
        "$date": "2004-03-08T00:00:00.000Z"
    },
    "password": "pwd1",
    "batch": "B1",
    "courses": [
        "QP01",
        "OS01",
        "DS01",
        "AP01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6ac98"
    },
    "enroll": 1002,
    "name": " Diya Patel",
    "gender": "Female",
    "dob": {
        "$date": "2001-05-03T00:00:00.000Z"
    },
    "password": "pwd2",
    "batch": "B1",
    "courses": [
        "DS01",
        "ML01",
        "DL01",
        "AP01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6ac99"
    },
    "enroll": 1003,
    "name": " Aryan Kumar",
    "gender": "Male",
    "dob": {
        "$date": "2001-11-07T00:00:00.000Z"
    },
    "password": "pwd3",
    "batch": "B1",
    "courses": [
        "DS01",
        "AP01",
        "ML01",
        "OS01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6ac9a"
    },
    "enroll": 1004,
    "name": " Kavya Singh",
    "gender": "Female",
    "dob": {
        "$date": "1999-08-05T00:00:00.000Z"
    },
    "password": "pwd4",
    "batch": "B1",
    "courses": [
        "OS01",
        "AM01",
        "DL01",
        "QP01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6ac9b"
    },
    "enroll": 1005,
    "name": " Rohan Gupta",
    "gender": "Female",
    "dob": {
        "$date": "2000-05-30T00:00:00.000Z"
    },
    "password": "pwd5",
    "batch": "B1",
    "courses": [
        "CA01",
        "DL01",
        "QP01",
        "BNM01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6ac9c"
    },
    "enroll": 1006,
    "name": " Ananya Rao",
    "gender": "Female",
    "dob": {
        "$date": "1998-04-09T00:00:00.000Z"
    },
    "password": "pwd6",
    "batch": "B1",
    "courses": [
        "ML01",
        "DS01",
        "OS01",
        "CA01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6ac9d"
    },
    "enroll": 1007,
    "name": " Vihaan Nair",
    "gender": "Male",
    "dob": {
        "$date": "1999-08-20T00:00:00.000Z"
    },
    "password": "pwd7",
    "batch": "B1",
    "courses": [
        "AM01",
        "BNM01",
        "AP01",
        "QP01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6ac9e"
    },
    "enroll": 1008,
    "name": " Sneha Choudhary",
    "gender": "Female",
    "dob": {
        "$date": "2002-06-08T00:00:00.000Z"
    },
    "password": "pwd8",
    "batch": "B1",
    "courses": [
        "OS01",
        "DL01",
        "QP01",
        "BNM01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6ac9f"
    },
    "enroll": 1009,
    "name": " Dev Iyer",
    "gender": "Female",
    "dob": {
        "$date": "2004-05-18T00:00:00.000Z"
    },
    "password": "pwd9",
    "batch": "B1",
    "courses": [
        "ML01",
        "BNM01",
        "AP01",
        "DL01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6aca0"
    },
    "enroll": 1010,
    "name": " Riya Malhotra",
    "gender": "Male",
    "dob": {
        "$date": "2000-10-30T00:00:00.000Z"
    },
    "password": "pwd10",
    "batch": "B1",
    "courses": [
        "AP01",
        "QP01",
        "DS01",
        "ML01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6aca1"
    },
    "enroll": 1011,
    "name": " Aditya Joshi",
    "gender": "Female",
    "dob": {
        "$date": "2000-01-21T00:00:00.000Z"
    },
    "password": "pwd11",
    "batch": "B1",
    "courses": [
        "CA01",
        "BNM01",
        "DS01",
        "QP01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6aca2"
    },
    "enroll": 1012,
    "name": " Ishika Das",
    "gender": "Female",
    "dob": {
        "$date": "2003-03-17T00:00:00.000Z"
    },
    "password": "pwd12",
    "batch": "B1",
    "courses": [
        "AP01",
        "AM01",
        "BNM01",
        "QP01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6aca3"
    },
    "enroll": 1013,
    "name": " Arjun Kapoor",
    "gender": "Male",
    "dob": {
        "$date": "2006-07-20T00:00:00.000Z"
    },
    "password": "pwd13",
    "batch": "B1",
    "courses": [
        "QP01",
        "DL01",
        "OS01",
        "AP01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6aca4"
    },
    "enroll": 1014,
    "name": " Aanya Mehta",
    "gender": "Female",
    "dob": {
        "$date": "2005-08-19T00:00:00.000Z"
    },
    "password": "pwd14",
    "batch": "B1",
    "courses": [
        "BNM01",
        "OS01",
        "DL01",
        "CA01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "672f680903ae1392f0c6aca5"
    },
    "enroll": 1015,
    "name": " Rahul Mishra",
    "gender": "Male",
    "dob": {
        "$date": "2003-05-28T00:00:00.000Z"
    },
    "password": "pwd15",
    "batch": "B1",
    "courses": [
        "AM01",
        "DS01",
        "OS01",
        "DL01"
    ],
    "semester": 6
},
{
    "_id": {
        "$oid": "673a2d50af8b90ea6eae169b"
    },
    "enroll": 1016,
    "name": "Tushar Sharma",
    "gender": "Male",
    "dob": {
        "$date": "2004-01-17T00:00:00.000Z"
    },
    "password": "pwd1",
    "batch": "B2",
    "courses": [
        "BNM01",
        "ML01",
        "OS01",
        "DL01"
    ],
    "semester": 6,
    "__v": 0
},
{
    "_id": {
        "$oid": "673a2e1caf8b90ea6eae16a2"
    },
    "enroll": 1017,
    "name": "Kaanayan Sukhija",
    "gender": "Male",
    "dob": {
        "$date": "2003-05-22T00:00:00.000Z"
    },
    "password": "pwd1",
    "batch": "B1",
    "courses": [
        "AM01",
        "QP01",
        "ML01",
        "DL01"
    ],
    "semester": 6,
    "__v": 0
},
{
    "_id": {
        "$oid": "673a307eaf8b90ea6eae16a9"
    },
    "enroll": 1018,
    "name": "Shantanu Kandwal",
    "gender": "Male",
    "dob": {
        "$date": "2003-01-25T00:00:00.000Z"
    },
    "password": "pwd1",
    "batch": "B2",
    "courses": [
        "DS01",
        "SC01",
        "CA01",
        "ML01"
    ],
    "semester": 6,
    "__v": 0
},
{
    "_id": {
        "$oid": "673a30d4af8b90ea6eae16b0"
    },
    "enroll": 1019,
    "name": "Mayank Johri",
    "gender": "Male",
    "dob": {
        "$date": "2004-01-01T00:00:00.000Z"
    },
    "password": "pwd1",
    "batch": "B1",
    "courses": [
        "DL01",
        "ML01",
        "BNM01",
        "QP01"
    ],
    "semester": 6,
    "__v": 0
},
{
    "_id": {
        "$oid": "673b03911b015630fc2b1e9d"
    },
    "enroll": 1020,
    "name": "Nikhil Gupta",
    "gender": "Male",
    "dob": {
        "$date": "2002-01-01T00:00:00.000Z"
    },
    "password": "pwd1",
    "batch": "B2",
    "courses": [
        "ML01",
        "DS01",
        "DL01",
        "SC01"
    ],
    "semester": 6,
    "__v": 0
},
{
    "_id": {
        "$oid": "673b05211b015630fc2b1ec3"
    },
    "enroll": 1021,
    "name": "Aditya Singhla",
    "gender": "Male",
    "dob": {
        "$date": "2003-04-15T00:00:00.000Z"
    },
    "password": "pwd1",
    "batch": "B2",
    "courses": [
        "AM01",
        "BNM01",
        "ML01",
        "CA01"
    ],
    "semester": 6,
    "__v": 0
},
{
    "_id": {
        "$oid": "673b05961b015630fc2b1ee1"
    },
    "enroll": 1022,
    "name": "Jatin Gupta",
    "gender": "Male",
    "dob": {
        "$date": "2003-10-10T00:00:00.000Z"
    },
    "password": "pwd1",
    "batch": "B2",
    "courses": [
        "AM01",
        "ML01",
        "OS01",
        "CA01"
    ],
    "semester": 6,
    "__v": 0
},
{
    "_id": {
        "$oid": "673b30a26d1e0201a0243542"
    },
    "enroll": 1023,
    "name": "Tanya Gupta",
    "gender": "Female",
    "dob": {
        "$date": "2004-10-10T00:00:00.000Z"
    },
    "password": "pwd1",
    "batch": "B2",
    "courses": [
        "AM01",
        "ML01",
        "OS01",
        "SC01"
    ],
    "semester": 6,
    "__v": 0
},
{
    "_id": {
        "$oid": "673b33e46d1e0201a0243590"
    },
    "enroll": 1024,
    "name": "Abhay Singh",
    "gender": "Male",
    "dob": {
        "$date": "2004-01-15T00:00:00.000Z"
    },
    "password": "pwd1",
    "batch": "B2",
    "courses": [
        "AM01",
        "CA01",
        "ML01",
        "DL01"
    ],
    "semester": 6,
    "__v": 0
}];

const updateStudentCourses = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    const allCourses = await Courses.find();
    let courseDict = [];
    allCourses?.forEach((item) => {
        let d = {};
        d.cid = item.cid;
        d._id = item._id;
        courseDict.push(d);
    });
    const newData = allStudents.map(student => {
        const updatedCourse = student.courses.map(cid => {
            const course = courseDict.find(item => item.cid == cid);
            return course._id;
        });
        return { ...student, courses: updatedCourse, dob: new Date(student.dob.$date), _id: new mongoose.Types.ObjectId(student._id.$oid) };
    })
    await StudentData.insertMany(newData);
}

updateStudentCourses();