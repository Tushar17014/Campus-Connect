import { StudentAttendanceTableProps } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

const StudentAttendanceTable = ({ attendanceData }: { attendanceData: StudentAttendanceTableProps[] }) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Enrollment</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Attendance</TableHead>
            <TableHead>Approved Attendance</TableHead>
            <TableHead>Final Attendance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendanceData.map((record, idx) => (
            <TableRow key={idx} className="h-20">
              <TableCell>
                <div className="flex gap-3 items-center">
                  <Avatar>
                    <AvatarImage src={record.studentData.profileImg} width={40} className="rounded-full" />
                  </Avatar>
                  <p className="text-base">{record.studentData.name}</p>
                </div>
              </TableCell>
              <TableCell>{record.studentData.enroll}</TableCell>
              <TableCell>{record.studentData.batch}</TableCell>
              <TableCell className={record.presentPercent < 60 ? "text-red-500" : "text-green-500"}>
                {record.presentPercent} %
              </TableCell>
              <TableCell className={record.extraAttendance != 0 ? "text-green-500" : ""}>{record.extraAttendance}</TableCell>
              <TableCell className={record.finalPercent < 60 ? "text-red-500" : "text-green-500"}>
                {record.finalPercent} %
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default StudentAttendanceTable
