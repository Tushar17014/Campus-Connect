import { StudentAllCoursesAttendanceProps } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useNavigate } from "react-router-dom";

interface StudentAllCoursesAttendanceTableProps {
  AllCourseAttendance: StudentAllCoursesAttendanceProps[];
}

const StudentAllCoursesAttendanceTable = ({ AllCourseAttendance }: StudentAllCoursesAttendanceTableProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg">S.No</TableHead>
            <TableHead className="text-lg">Course Code</TableHead>
            <TableHead className="text-lg">Course Name</TableHead>
            <TableHead className="text-lg">Attendance</TableHead>
            <TableHead className="text-lg">Total Classes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {AllCourseAttendance.map((record, idx) => (
            <TableRow key={idx} className="h-20 cursor-pointer" onClick={() => navigate(`${record.course.cid}`)}>
              <TableCell>{idx + 1}</TableCell>
              <TableCell>{record.course.cid}</TableCell>
              <TableCell>{record.course.name}</TableCell>
              <TableCell className={record.attendancePercentage < 60 ? "text-red-500" : "text-green-500"}>
                {record.attendancePercentage.toFixed(1)} %
              </TableCell>
              <TableCell>{record.totalClasses}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default StudentAllCoursesAttendanceTable
