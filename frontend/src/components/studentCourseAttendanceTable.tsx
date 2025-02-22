import { StudentAttendanceRecordsProps } from "@/types";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatToddmmyy } from "@/lib/utils";

interface StudentCoursesAttendanceTableProps {
    CourseAttendance: StudentAttendanceRecordsProps[];
}

const StudentCourseAttendanceTable = ({ CourseAttendance }: StudentCoursesAttendanceTableProps) => {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg">S.No</TableHead>
                        <TableHead className="text-lg">Date</TableHead>
                        <TableHead className="text-lg">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {CourseAttendance.map((record, idx) => (
                        <TableRow key={idx} className="h-20">
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>{formatToddmmyy(record.date)}</TableCell>
                            <TableCell className={record.status  ? "text-green-500" : "text-red-500"}>
                                {record.status ? "Present" : "Absent"}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default StudentCourseAttendanceTable
