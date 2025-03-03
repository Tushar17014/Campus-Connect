import { ConfirmAttendanceTableProps } from "@/types"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Checkbox } from "./ui/checkbox"
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { markAttendance } from "@/apis/attendance";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ConfirmAttendanceTable = ({ confirmAttendanceData, selectedCourse }: { confirmAttendanceData: ConfirmAttendanceTableProps[], selectedCourse: string }) => {
    const {toast} = useToast();
    const navigate = useNavigate();

    const [attendanceDataML, setAttendanceDataML] = useState(confirmAttendanceData);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = attendanceDataML.map((item) => ({
            enroll: item.enroll,
            status: item.status,
        }));
        console.log(result);
        console.log(selectedCourse);
        await markAttendance(result, selectedCourse);
        toast({
            title: "Attendance Marked",
            description: "Attendance has been marked successfully"
        })
        navigate("/teacher");
    }
    const handleCheckboxChange = (index: number) => {
        const updatedData = [...attendanceDataML];
        updatedData[index].status = !updatedData[index].status;
        setAttendanceDataML(updatedData);
    };
    return (
        <form onSubmit={handleSubmit}>
            <Card className="bg-mainbg m-5">
                <CardHeader >
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">Verify Attendance</h3>
                    </div>
                </CardHeader>
                <Separator className="mb-5" />
                <CardContent className="max-h-[60vh] overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Enrollment</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Batch</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {confirmAttendanceData?.map((item, idx) => (
                                <TableRow className="h-20" key={idx}>
                                    <TableCell>{item.enroll}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.batch}</TableCell>
                                    <TableCell>
                                        <Checkbox checked={item.status} onClick={() => handleCheckboxChange(idx)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <div className="m-5">
                <Button type="submit">Confirm</Button>
            </div>
        </form>
    )
}

export default ConfirmAttendanceTable
