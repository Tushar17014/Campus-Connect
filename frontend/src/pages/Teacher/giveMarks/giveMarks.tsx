import { postMarkByEnroll } from "@/apis/marks";
import CourseSelector from "@/components/courseSelector";
import DownloadExcelTemplate from "@/components/downloadExcelTemplate";
import DropExcel from "@/components/dropExcel";
import EventSelector from "@/components/eventDropdown";
import Header from "@/components/header"
import MainLoader from "@/components/mainLoader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { examEvents } from "@/constants";
import { RootState } from "@/store/store";
import { MarksExcelData } from "@/types";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as XLSX from 'xlsx';

const GiveMarks = () => {
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [examEvent, setExamEvent] = useState<string | null>(null);
    const [score, setScore] = useState<number | null>(null);
    const [isExcel, setIsExcel] = useState<boolean>(false);
    const [excelData, setExcleData] = useState<MarksExcelData[]>();

    const teacherData = useSelector((state: RootState) => state.teacherReducer);

    const availableCourses = teacherData.courses

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (isExcel && excelData && examEvent) {
            const output = excelData.map(({ enroll, ...rest }) => ({
                enroll,
                semester: 6,
                examEvent: examEvent,
                marks: Object.entries(rest).map(([cid, score]) => ({
                    cid,
                    score
                }))
            }));
            await Promise.all(output.map(async (item) => {
                const response = await postMarkByEnroll(item.enroll, item.semester, item.examEvent, item.marks);
                console.log(response);
            }));
        }
        else {
            console.log(selectedCourse, examEvent, score);
        }
    };

    const handleExcelFile = (file: File) => {
        setIsExcel(true);
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = e.target?.result;
            if (!data) return;

            const workbook = XLSX.read(data, { type: 'binary' });

            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const jsonData: MarksExcelData[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });
            setExcleData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    return (
        <div className="flex-1 overflow-auto relative">
            <Header title="Give Marks" />
            {availableCourses ? (
                <Card className="bg-mainbg m-5">
                    <CardHeader >
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-semibold">Upload Lecture Summary</h3>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-2">
                            <form onSubmit={handleSubmit} encType='multipart/form-data' method='POST'>
                                <div className="flex flex-col gap-5 justify-center">
                                    <EventSelector data={examEvents} selectOneOption={true} selectOneOptionData="Exam Event" selectedData={(value: any) => setExamEvent(value)} />
                                    {examEvent && (
                                        <div className="flex gap-5 items-center">
                                            <CourseSelector availableCourses={availableCourses} selectedCourse={(value) => setSelectedCourse(value)} selectOneOption={true} />
                                            {selectedCourse && (
                                                <Input type="number" className="w-52 bg-black text-white h-12 text-lg" placeholder="Enter Marks" onChange={(e) => setScore(Number(e.target.value))} />
                                            )}

                                            - OR -

                                            <DropExcel onFileDrop={handleExcelFile} />
                                            <DownloadExcelTemplate />
                                        </div>
                                    )}
                                </div>
                                {((selectedCourse && score != null) || isExcel) && examEvent && (
                                    <Button type="submit" className="ml-1 mt-5">Submit</Button>
                                )}
                            </form>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <MainLoader />
            )}
        </div>
    )
}

export default GiveMarks
