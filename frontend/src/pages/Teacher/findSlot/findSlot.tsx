import Header from "@/components/header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import TimetableGrid from "@/components/timetableGrid"
import BatchSelector from "@/components/batchSelector"
import { useState } from "react";
import CourseSelector from "@/components/courseSelector";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import MainLoader from "@/components/mainLoader";
import { Button } from "@/components/ui/button";
import { getStudentFreeSlots, scheduleExtraClass } from "@/apis/timetable";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { days } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { getCourseNameByCid } from "@/lib/utils";

const availableBatches = ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8"];

const FindSlot = () => {
    const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [freeSlots, setFreeSlots] = useState<number[][]>([]);
    const [day, setDay] = useState<number>(0);
    const [time, setTime] = useState<number>(0);
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const { toast } = useToast();

    const teacherData = useSelector((state: RootState) => state.teacherReducer);

    const availableCourses = teacherData.courses;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await getStudentFreeSlots(selectedBatches);
        setFreeSlots(response);
    };

    const scheduleClass = (day: number, time: number) => {
        setDay(day);
        setTime(time);
        setOpenDialog(true);
    };

    const handleScheduleExtraClass = async () => {
        setOpenDialog(false);
        if (selectedCourse && availableCourses && teacherData.uid) {
            await scheduleExtraClass(days[day], time, selectedBatches, selectedCourse, teacherData.uid);

            toast({
                title: "Extra Class Scheduled",
                description: `Extra Class for ${getCourseNameByCid(selectedCourse, availableCourses)} on ${days[day]} at ${time}:00 has been scheduled`
            })
        }
    };

    return (
        <div className="flex-1 overflow-auto relative">
            <Header title="Find Free Slot" />
            {availableCourses ? (
                <div>
                    <Card className="bg-mainbg m-5">
                        <CardHeader >
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-semibold">Find free slots from student's timetable</h3>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form className="flex gap-5 items-center" onSubmit={handleSubmit} encType='multipart/form-data' method='POST'>
                                <CourseSelector availableCourses={availableCourses} selectedCourse={(value) => setSelectedCourse(value)} selectOneOption={true} />
                                <BatchSelector availableBatch={availableBatches} selectedBatch={(value) => setSelectedBatches(value)} />
                                {selectedCourse && selectedBatches.length > 0 && (
                                    <Button type="submit">Submit</Button>
                                )}
                            </form>
                        </CardContent>
                    </Card>
                    <Card className="bg-mainbg m-5">
                        <CardHeader >
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-semibold">Extra Classes</h3>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <TimetableGrid freeSlots={freeSlots} scheduleExtraClass={scheduleClass} />
                        </CardContent>
                    </Card>
                    {selectedCourse && (
                        <Dialog open={openDialog} onOpenChange={setOpenDialog} >
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Schedule Extra Class</DialogTitle>
                                </DialogHeader>
                                Schedule Extra Class for {getCourseNameByCid(selectedCourse, availableCourses)} on {days[day]} at {time}:00
                                <Button onClick={handleScheduleExtraClass}>Confirm</Button>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            ) : (
                <MainLoader />
            )}
        </div>
    )
}

export default FindSlot
