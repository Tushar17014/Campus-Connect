import { getAttendanceByCourseEnroll } from "@/apis/attendance";
import { getCourseDetails } from "@/apis/course";
import Header from "@/components/header"
import MainLoader from "@/components/mainLoader";
import StudentCourseAttendanceTable from "@/components/studentCourseAttendanceTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store/store";
import { StudentAttendanceRecordsProps } from "@/types";
import { ArrowLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"

const CheckCourseAttendance = () => {
    const navigate = useNavigate();
    const { cid } = useParams();

    const [courseAttendance, setCourseAttendance] = useState<StudentAttendanceRecordsProps[] | null>(null);
    const [courseName, setCourseName] = useState<string | null>(null);

    const studentData = useSelector((state: RootState) => state.studentReducer);

    const hasFetchedAttendance = useRef(false);

    useEffect(() => {
        if (studentData && studentData.enroll && cid && !hasFetchedAttendance.current) {
            hasFetchedAttendance.current = true;
            const fetchAttendance = async () => {
                const response = await getAttendanceByCourseEnroll(cid, studentData.enroll);
                const courseResponse = await getCourseDetails(cid);
                setCourseName(courseResponse?.name);
                setCourseAttendance(response);
            };
            fetchAttendance();
        }
    }, [cid, studentData]);

    return (
        <div className="flex-1 overflow-auto relative">
            <Header title="Check Attendance" />
            {courseAttendance && courseName ? (
                <Card className="bg-mainbg max-h-[440px] m-5 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
                    <CardHeader >
                        <div className="flex gap-3 items-center mb-3">
                            <div className="cursor-pointer rounded-full p-2 hover:bg-white/10 active:scale-95" onClick={() => navigate("..", {relative: 'path'})}>
                                <ArrowLeft />
                            </div>
                            <h3 className="text-xl font-semibold">{courseName}</h3>
                        </div>
                    </CardHeader>
                    <Separator className="-mt-4 mb-5" />
                    <CardContent>
                        <StudentCourseAttendanceTable CourseAttendance={courseAttendance} />
                    </CardContent>
                </Card>
            ) : (
                <MainLoader />
            )}
        </div>
    )
}

export default CheckCourseAttendance
