import { getAttendanceByEnroll } from "@/apis/attendance";
import Header from "@/components/header"
import MainLoader from "@/components/mainLoader";
import StudentAllCoursesAttendanceTable from "@/components/studentAllCoursesAttendanceTable"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store/store";
import { StudentAllCoursesAttendanceProps, StudentAttendanceByEnrollData } from "@/types";
import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";

const CheckAttendance = () => {
    const [allCourseAttendance, setAllCourseAttendance] = useState<StudentAllCoursesAttendanceProps[] | null>(null);

    const studentData = useSelector((state: RootState) => state.studentReducer);

    const hasFetchedAllAttendance = useRef(false);

    useEffect(() => {
        if (studentData && studentData.enroll && !allCourseAttendance && !hasFetchedAllAttendance.current) {
            hasFetchedAllAttendance.current = true;
            const fetchAttendance = async () => {
                const response = await getAttendanceByEnroll(studentData.enroll);

                const attendanceData = response?.courses.map((obj: StudentAttendanceByEnrollData) => {
                    const totalClasses = obj.attendanceRecords.length;
                    const presentClasses = obj.attendanceRecords.filter(rec => rec.status == true).length;
                    const attendancePercentage = totalClasses == 0 ? 0 : (presentClasses / totalClasses) * 100;
                    const rec = { course: obj.course, totalClasses, presentClasses, attendancePercentage };
                    return rec;
                })

                setAllCourseAttendance(attendanceData);
            };
            fetchAttendance();
        }
    }, [studentData]);

    return (
        <div className="flex-1 overflow-auto relative">
            <Header title="Check Attendance" />
            {allCourseAttendance ? (
                <div>
                    <Card className="bg-mainbg max-h-[440px] m-5 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
                        <CardHeader >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">Your Attendance</h3>
                            </div>
                        </CardHeader>
                        <Separator className="mb-5" />
                        <CardContent>
                            <StudentAllCoursesAttendanceTable AllCourseAttendance={allCourseAttendance} />
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <MainLoader />
            )}
        </div>
    )
}

export default CheckAttendance