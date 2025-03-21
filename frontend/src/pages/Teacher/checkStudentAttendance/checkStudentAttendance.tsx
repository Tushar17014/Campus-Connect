import { getAttendanceByCourse } from "@/apis/attendance";
import Header from "@/components/header"
import MainLoader from "@/components/mainLoader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store/store";
import { StudentAttendanceByCourseData, StudentAttendanceTableProps } from "@/types";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import StudentAttendanceTable from "./studentAttendanceTable";
import { Input } from "@/components/ui/input";

const CheckStudentAttendance = () => {
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [allAttendanceRecords, setAllAttendanceRecords] = useState<StudentAttendanceTableProps[] | null>(null);
    const [studentAttendance, setStudentAttendance] = useState<StudentAttendanceTableProps[] | null>(null);
    const [searchField, setSearchField] = useState<string>("");

    const teacherData = useSelector((state: RootState) => state.teacherReducer);

    useEffect(() => {
        if (teacherData.courses && !selectedCourse) {
            setSelectedCourse(teacherData?.courses[0].cid);
        }
    }, [teacherData]);

    useEffect(() => {
        if (selectedCourse && teacherData) {
            const fetchAttendance = async () => {
                const response = await getAttendanceByCourse(selectedCourse);
                const attendanceData = response?.map((obj: StudentAttendanceByCourseData) => {
                    const totalClasses = obj.attendanceRecords.length;
                    const presentClasses = obj.attendanceRecords.filter(item => item.status === true).length;
                    const presentPercent = ((presentClasses / totalClasses) * 100).toFixed(1);
                    let finalPercent = ((presentClasses + obj.extraAttendance / totalClasses) * 100);
                    if (finalPercent > 100) {
                        finalPercent = 100
                    }
                    return { studentData: obj.studentData, presentPercent, extraAttendance: obj.extraAttendance, finalPercent: finalPercent.toFixed(1) };
                });
                setStudentAttendance(attendanceData);
                setAllAttendanceRecords(attendanceData);
            };
            fetchAttendance();
        }
    }, [selectedCourse]);

    useEffect(() => {
        if (searchField && searchField.length > 0 && allAttendanceRecords && allAttendanceRecords.length > 0) {
            const query = searchField.toLowerCase();

            const filteredData = allAttendanceRecords.filter(
                (item) =>
                    item.studentData.name.toLowerCase().includes(query) || 
                    item.studentData.enroll.toString().includes(query)
            );
            setStudentAttendance(filteredData);
        }
        else if(searchField.length == 0){
            setStudentAttendance(allAttendanceRecords);
        }
    }, [searchField])

    return (
        <div className="flex-1 overflow-auto relative">
            {teacherData && teacherData.courses && (
                <div>
                    <Header title="Check Attendance" selectedCourse={(value) => setSelectedCourse(value)} availableCourses={teacherData.courses} />
                    {studentAttendance ? (
                        <div>
                            <Card className="bg-mainbg m-5 max-h-[660px] overflow-y-hidden">
                                <CardHeader >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-xl font-semibold">Attendance</h3>
                                        <Input className="w-96 bg-black text-white h-12 text-lg" placeholder="Search Student.." onChange={(e) => setSearchField(e.target.value)} />
                                    </div>
                                </CardHeader>
                                <Separator className="mb-5" />
                                <CardContent className="max-h-[660px] overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
                                    <StudentAttendanceTable attendanceData={studentAttendance} />
                                </CardContent>
                            </Card>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-[84vh]">
                            <MainLoader />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CheckStudentAttendance