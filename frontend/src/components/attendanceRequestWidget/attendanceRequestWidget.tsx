import { Card, CardContent, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"
import AttendanceRequestTable from "./attendanceRequestTable"
import '../scrollbar.css'
import { AttendanceRequestTableProps } from "@/types"

const AttendanceRequestWidget = ({data}: AttendanceRequestTableProps) => {
    return (
        <Card className="bg-mainbg max-h-[600px] min-h-[600px] overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
            <CardHeader >
                <h3 className="text-xl font-semibold">Attendance Requests</h3>
            </CardHeader>

            <Separator className="mb-5" />

            <CardContent>
                <AttendanceRequestTable data={data}/>    
            </CardContent>

        </Card>
    )
}

export default AttendanceRequestWidget
