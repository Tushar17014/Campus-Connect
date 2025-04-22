import { takeAttendance, takeAttendanceRequestStatus } from "@/apis/attendance";
import { getStudentByCourse } from "@/apis/student";
import BatchSelector from "@/components/batchSelector";
import ConfirmAttendanceTable from "@/components/confirmAttendanceTable";
import CourseSelector from "@/components/courseSelector";
import Header from "@/components/header"
import MainLoader from "@/components/mainLoader";
import MultiImageUploadComponent from "@/components/multiImageUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Label } from "@/components/ui/label";
import { takeAttendanceRequestCheckInterval } from "@/constants";
import { RootState } from "@/store/store";
import { ConfirmAttendanceTableProps } from "@/types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const availableBatches = ["B1", "B2", "B3"];

const TakeAttendance = () => {

    const [pageTitle, setPageTitle] = useState('Take Attendance');
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [uploadedImages, setUploadedImages] = useState<File[] | null>(null);
    const [confirmAttendanceRecords, setConfirmAttendacneRecords] = useState<ConfirmAttendanceTableProps[] | null>(null);
    const [attendanceLoading, setAttendanceLoading] = useState(false);
    const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
    const [presentEnrolls, setPresentEnrolls] = useState<number[]>([]);

    const teacherData = useSelector((state: RootState) => state.teacherReducer);

    const availableCourses = teacherData.courses;

    useEffect(() => {
        const requestId = localStorage.getItem("attendanceRequestId");
        if (requestId) {
            const getRequest = async () => {
                const request = await takeAttendanceRequestStatus(requestId);
                if (request.status == "completed") {
                    setAttendanceLoading(false);
                    setPresentEnrolls([...request.enrolls]);
                }
                else if (request.status == "processing" || request.status == "pending") {
                    setAttendanceLoading(true);
                    setTimeout(getRequest, takeAttendanceRequestCheckInterval);
                }
                else {
                    window.location.reload();
                }
            };
            getRequest();
        }
    }, []);

    useEffect(() => {
        if (presentEnrolls.length > 0) {
            const fetchConfirmStudents = async () => {
                let temp: any = [];

                const allStudents = await getStudentByCourse(selectedCourse);
                allStudents.forEach((obj: any) => {
                    if (presentEnrolls?.includes(obj.enroll)) {
                        temp.push({ enroll: obj.enroll, name: obj.name, batch: obj.batch, status: true });
                    }
                    else {
                        temp.push({ enroll: obj.enroll, name: obj.name, batch: obj.batch, status: false });
                    }
                })

                setConfirmAttendacneRecords(temp);
                setPageTitle("Confirm Attendance")
            };
            fetchConfirmStudents();
        }
    }, [presentEnrolls]);


    useEffect(() => {
        if (!selectedCourse && teacherData?.courses) {
            setSelectedCourse(teacherData.courses[0].cid);
        }
    }, [teacherData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!uploadedImages) {
            alert("No Image");
            return;
        }
        if (selectedCourse) {
            try {
                const formData = new FormData();

                uploadedImages.forEach((image) => formData.append("image", image));
                formData.append('cid', selectedCourse);

                const response = await takeAttendance(formData);

                if (response && response.requestId) {
                    localStorage.setItem("attendanceRequestId", response.requestId);
                    const getRequest = async () => {
                        const request = await takeAttendanceRequestStatus(response.requestId);
                        if (request.status == "completed") {
                            setAttendanceLoading(false);
                            setPresentEnrolls([...request.enrolls]);
                        }
                        else if (request.status == "processing" || request.status == "pending") {
                            setAttendanceLoading(true);
                            setTimeout(getRequest, takeAttendanceRequestCheckInterval);
                        }
                        else {
                            window.location.reload();
                        }
                    };
                    getRequest();
                }

            } catch (error: any) {
                console.error("Error uploading Image: ", error.message);
            }
        }
    };

    return (
        <div className="flex-1 overflow-auto relative">
            <Header title={pageTitle} />
            {attendanceLoading ? (
                <div className="flex items-center justify-center h-[84vh]">
                    <MainLoader extraContent="Scanning Faces..." loadingText={false} />
                </div>

            ) : (
                <div>
                    {confirmAttendanceRecords && selectedCourse ? (
                        <ConfirmAttendanceTable confirmAttendanceData={confirmAttendanceRecords} selectedCourse={selectedCourse} />
                    ) : (
                        <div>
                            {availableCourses ? (
                                <Card className="bg-mainbg m-5">
                                    <CardHeader >
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-2xl font-semibold">Take Attendance</h3>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-col gap-2">
                                            <form onSubmit={handleSubmit} encType='multipart/form-data' method='POST'>
                                                <div className="flex flex-col gap-3">
                                                    <div className="flex gap-5 items-center">
                                                        <Label className="text-lg">Select Class: </Label>
                                                        <CourseSelector availableCourses={availableCourses} selectedCourse={(value) => setSelectedCourse(value)} />
                                                        <BatchSelector availableBatch={availableBatches} selectedBatch={(value) => setSelectedBatches(value)} />
                                                    </div>
                                                    <MultiImageUploadComponent imageData={uploadedImages} uploadedImages={setUploadedImages} maxImage={5} />
                                                </div>
                                                {uploadedImages && selectedCourse && selectedBatches?.length > 0 && (
                                                    <div>
                                                        <Button type="submit" className="ml-1">Submit</Button>
                                                    </div>
                                                )}
                                            </form>
                                        </div>
                                    </CardContent>
                                </Card>
                            ) : (
                                <div className="flex items-center justify-center h-[84vh]">
                                    <MainLoader />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default TakeAttendance
