import { getAttendanceByCourseEnroll } from "@/apis/attendance";
import { checkAttendanceRequestForStudent, createAttendanceRequest, getAttendanceRequestsForStudentByEnroll } from "@/apis/attendanceRequest";
import CourseSelector from "@/components/courseSelector"
import EventSelector from "@/components/eventDropdown";
import Header from "@/components/header"
import ImageUploadComponent from "@/components/imageUpload";
import MainLoader from "@/components/mainLoader";
import StudentAttendanceRequestTable from "@/components/studentAttendanceRequestTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { formatToddmmyy } from "@/lib/utils";
import { RootState } from "@/store/store";
import { AttendanceRequestProps, StudentAttendanceRecordsProps } from "@/types";
import { Loader } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const RequestAttendance = () => {
    const { toast } = useToast();

    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [attendanceData, setAttendanceData] = useState<Date[] | null>(null);
    const [selectedAttendance, setSelectedAttendance] = useState<Date | null>(null);
    const [reason, setReason] = useState<string | null>(null);
    const [uploadedProof, setUploadedProof] = useState<File | null>(null);
    const [submitDisabled, setSubmitDisabled] = useState(true);

    const [attendanceRequestData, setAttendanceRequestData] = useState<AttendanceRequestProps[] | null>(null);

    const studentData = useSelector((state: RootState) => state.studentReducer);

    const availableCourses = studentData.courses;

    const hasFetchedAttendanceRequestData = useRef(false);

    useEffect(() => {
        if (studentData && studentData.enroll && !hasFetchedAttendanceRequestData.current) {
            hasFetchedAttendanceRequestData.current = true;
            const fetchAttendanceRequests = async () => {
                const response = await getAttendanceRequestsForStudentByEnroll(studentData.enroll);
                setAttendanceRequestData(response);
            };
            fetchAttendanceRequests();
        }
        if (!selectedCourse && studentData?.courses) {
            setSelectedCourse(studentData.courses[0].cid);
        }
    }, [studentData]);

    useEffect(() => {
        if (selectedCourse && studentData?.enroll) {
            const fetchAttendance = async () => {
                const response = await getAttendanceByCourseEnroll(selectedCourse, studentData.enroll);
                const attendanceData = await Promise.all(response
                    ?.filter((rec: StudentAttendanceRecordsProps) => !rec.status)
                    .slice(0, 3)
                    .map(async (rec: StudentAttendanceRecordsProps) => {
                        const attendanceRequest = await checkAttendanceRequestForStudent(studentData.enroll, selectedCourse, rec.date);
                        return attendanceRequest === false ? rec.date : null;
                    }));
                const filteredAttendanceData = attendanceData.filter((x) => x !== null && x !== undefined);
                if (!filteredAttendanceData || filteredAttendanceData?.length == 0) {
                    toast({
                        title: "Cannot Request Attendance",
                        description: "You cannot request attendance for the selected course"
                    })
                }
                setAttendanceData(filteredAttendanceData);
                if (filteredAttendanceData?.length > 0) {
                    setSelectedAttendance(filteredAttendanceData[0]);
                }
                else {
                    setSelectedAttendance(null);
                }
            };
            fetchAttendance();
        }
    }, [selectedCourse]);

    useEffect(() => {
        if (selectedCourse && selectedAttendance && reason && uploadedProof) {
            setSubmitDisabled(false);
        }
        else {
            setSubmitDisabled(true);
        }
    }, [selectedCourse, selectedAttendance, reason, uploadedProof]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (selectedCourse && selectedAttendance && reason && uploadedProof && studentData?.enroll) {

            const formData = new FormData();
            formData.append("enroll", String(studentData.enroll));
            formData.append("cid", selectedCourse);
            formData.append("date", String(selectedAttendance));
            formData.append("reason", reason);
            formData.append("proof", uploadedProof);
            try {
                const newAttendanceRequest = await createAttendanceRequest(formData);
                const newAttendanceData = attendanceData?.filter(date => date !== selectedAttendance) || []
                setAttendanceData(newAttendanceData);
                setSelectedAttendance(newAttendanceData[0]);
                setAttendanceRequestData(prev => prev ? [...prev, newAttendanceRequest] : [newAttendanceRequest]);
                setReason(null);
                setUploadedProof(null);
                setSubmitDisabled(true);
                toast({
                    title: "Attendance Requests",
                    description: `Attendance for ${formatToddmmyy(selectedAttendance)} has been requested`
                })
            } catch {
                toast({ title: "Error", description: "Failed to submit attendance request." });
            }
        }
    }

    return (
        <div className="flex-1 overflow-auto relative">
            <Header title="Request Attendance" />
            {availableCourses ? (
                <div>
                    <Card className="bg-mainbg m-5">
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-semibold">Request For Attendance</h3>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <form onSubmit={handleSubmit} encType='multipart/form-data' method='POST' className="flex flex-col gap-5">
                                    <div className="flex gap-5 items-center">
                                        <CourseSelector availableCourses={availableCourses} selectedCourse={(value: any) => setSelectedCourse(value)} />
                                        {selectedCourse && attendanceData && attendanceData?.length > 0 && (
                                            <div className="flex gap-5 items-center">
                                                <EventSelector data={attendanceData} selectedData={(value: any) => setSelectedAttendance(value)} />
                                                {selectedAttendance && (
                                                    <Input type="text" placeholder="Reason for request" className="w-96 bg-black text-white h-12 text-lg" onChange={(e) => setReason(e.target.value)} value={reason || ""} />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        {selectedCourse && attendanceData && attendanceData?.length > 0 && selectedAttendance && (
                                            <div className="flex flex-col">
                                                <ImageUploadComponent uploadedImage={setUploadedProof} imageData={uploadedProof} />
                                                <Button type="submit" className="p-5 text-md max-w-24" disabled={submitDisabled}>Submit</Button>
                                            </div>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-mainbg max-h-[350px] min-h-[350px] m-5 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
                        <CardHeader >
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold">Your Requests</h3>
                            </div>
                        </CardHeader>
                        <Separator className="mb-5" />
                        <CardContent>
                            {attendanceRequestData ? (
                                <StudentAttendanceRequestTable data={attendanceRequestData} />
                            ) : (
                                <div className="flex justify-center items-center">
                                    <Loader className='size-6 text-red-700 animate-spin' />
                                </div>
                            )}
                        </CardContent>

                    </Card>
                </div>
            ) : (
                <MainLoader />
            )}
        </div>
    )
}

export default RequestAttendance
