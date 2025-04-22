import { getLecturesByStudent } from "@/apis/lectures"
import CourseSelector from "@/components/courseSelector"
import Header from "@/components/header"
import LectureSummariesTable from "@/components/lectureSummariesTable"
import MainLoader from "@/components/mainLoader"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RootState } from "@/store/store"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const StudentLectures = () => {
    const [groupByCourse, setGroupByCourse] = useState<string | null>("All");
    const [lectureSummariesRecords, setLectureSummariesRecords] = useState([]);
    const [filteredLectures, setFilteredLectures] = useState(lectureSummariesRecords);

    const studentData = useSelector((state: RootState) => state.studentReducer);

    const availableCourses = studentData.courses

    useEffect(() => {
        if (studentData && studentData.enroll && lectureSummariesRecords.length == 0) {
            const fetchLectures = async () => {
                const response = await getLecturesByStudent(studentData.enroll);
                let records:any = [];
                response?.map((lecture: any) => {
                    if(lecture){
                        records.push(lecture);
                    }
                })
                const sortedLectures = records.sort((a : any, b: any) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                  });
                setLectureSummariesRecords(sortedLectures);
            };
            fetchLectures();
        }
    }, [studentData]);

    useEffect(() => {
        if (groupByCourse && lectureSummariesRecords.length > 0) {
            setFilteredLectures(groupByCourse === "All" ? lectureSummariesRecords : lectureSummariesRecords.filter((lecture: any) => lecture.course.cid == groupByCourse));
        }
    }, [groupByCourse, lectureSummariesRecords]);

    return (
        <div className="flex-1 overflow-auto relative">
            <Header title="Lectures" />
            {availableCourses ? (
                <Card className="bg-mainbg max-h-[650px] min-h-[650px] m-5 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
                    <CardHeader >
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-semibold">Lecture Summaries</h3>
                            <CourseSelector availableCourses={availableCourses} selectedCourse={(value) => setGroupByCourse(value)} selectAllOption={true} />
                        </div>
                    </CardHeader>
                    <Separator className="mb-5" />
                    <CardContent>
                        <LectureSummariesTable data={filteredLectures} />
                    </CardContent>

                </Card>
            ) : (
                <MainLoader />
            )}
        </div>
    )
}

export default StudentLectures
