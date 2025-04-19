import { Courses } from "../models/courses.model.js";
import { Marks } from "../models/marks.model.js";
import { StudentData } from "../models/studentData.model.js";

async function createNewMarkRecord(enroll, student, semester, examEvent, marks) {
    const updatedMarks = await Promise.all(marks.map(async (mark) => {
        const courseData = await Courses.findOne({ cid: mark.cid });
        if (!courseData) return res.status(404).json({ message: "Invalid Course ID" });
        return { course: courseData._id, score: mark.score };
    }));

    const totalCGPA = updatedMarks.reduce((sum, mark) => sum + (mark.score / 10), 0);
    const cgpa = (totalCGPA / updatedMarks.length).toFixed(2);

    const marksDataObject = {
        semester: semester,
        exams: [{
            examEvent: examEvent,
            marks: updatedMarks
        }]
    };

    const data = await Marks.create({ enroll, student, marksData: marksDataObject, cgpa });
}

async function createSemesterEvent(enroll, semester, examEvent, marks) {
    const updatedMarks = await Promise.all(marks.map(async (mark) => {
        const courseData = await Courses.findOne({ cid: mark.cid });
        if (!courseData) return res.status(404).json({ message: "Invalid Course ID" });
        return { course: courseData._id, score: mark.score };
    }));

    const newMarksData = {
        semester: semester,
        exams: [{
            examEvent: examEvent,
            marks: updatedMarks
        }]
    };

    await Marks.updateOne(
        { enroll: enroll },
        { $push: { marksData: newMarksData } }
    );
}

async function createExamEvent(enroll, semester, examEvent, marks) {
    const updatedMarks = await Promise.all(marks.map(async (mark) => {
        const courseData = await Courses.findOne({ cid: mark.cid });
        if (!courseData) return res.status(404).json({ message: "Invalid Course ID" });
        return { course: courseData._id, score: mark.score };
    }));

    const newExamEvent = {
        examEvent: examEvent,
        marks: updatedMarks
    };

    const prevData = await Marks.findOne({ enroll });
    if (!prevData) return ;

    const semesterEntry = prevData.marksData.find(m => m.semester === semester);
    if (!semesterEntry) return;

    semesterEntry.exams.push(newExamEvent);

    await prevData.save();
}

async function addMarksEvent(enroll, semester, examEvent, marks) {
    const updatedMarks = await Promise.all(marks.map(async (mark) => {
        const courseData = await Courses.findOne({ cid: mark.cid });
        if (!courseData) return res.status(404).json({ message: "Invalid Course ID" });
        return { course: courseData._id, score: mark.score };
    }));

    const prevData = await Marks.findOne({ enroll });
    if (!prevData) return ;

    const semesterEntry = prevData.marksData.find(m => m.semester === semester);
    if (!semesterEntry) return;

    const examEventEntry = semesterEntry.exams.find(ele => ele.examEvent === examEvent);
    if(!examEventEntry) return ;

    updatedMarks.forEach(obj => {
        const existing = examEventEntry.marks.find(m => m.course.toString() === obj.course.toString());
        if(existing) existing.score = obj.score;
        else examEventEntry.marks.push(obj);
    });
    
    await prevData.save();
};



export async function postMarkByEnroll(req, res) {
    try {
        const { enroll, semester, examEvent, marks } = req.body;
        // console.log(enroll, semester, examEvent, marks);
        const studentData = await StudentData.findOne({ enroll }).select("-password");

        if (!studentData) return res.status(404).json({ message: "Invalid Enroll" })

        const prevData = await Marks.findOne({ enroll });

        if (!prevData) {
            await createNewMarkRecord(enroll, studentData._id, semester, examEvent, marks);
            return res.status(200).json({ message: "New Mark Record Created" });
        }

        const doesSemesterExist = prevData.marksData.some(entry => entry.semester === semester);

        if (!doesSemesterExist) {
            await createSemesterEvent(enroll, semester, examEvent, marks);
            return res.status(200).json({ message: "New Semester Record Created" });
        }

        const doesExamEventExist = prevData.marksData.some(entry => {
            if (entry.semester == semester) {
                return entry.exams.some(exam => exam.examEvent === examEvent)
            }
        });

        if (!doesExamEventExist) {
            await createExamEvent(enroll, semester, examEvent, marks);
            return res.status(200).json({ message: "New Exam Event Created" });
        }

        await addMarksEvent(enroll, semester, examEvent, marks);

        return res.status(200).json({ message: "New Exam Marks Added" });
        
    } catch (err) {
        console.error(err.message);
    }
}