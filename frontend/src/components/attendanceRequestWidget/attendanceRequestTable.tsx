import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { AttendanceRequestTableProps } from "@/types"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Loader } from "lucide-react"
import { DialogTitle } from "@radix-ui/react-dialog"
import { formatToddmmyy } from "@/lib/utils"
import { handleAttendanceRequest } from "@/apis/attendanceRequest"
import { useToast } from "@/hooks/use-toast"

const AttendanceRequestTable = ({ data }: AttendanceRequestTableProps) => {
    const {toast} = useToast();
    const [imageLoaded, setImageLoaded] = useState(false);
    const [attendanceRequests, setAttendanceRequests] = useState(data);

    const handleRequest = async (enroll: number, cid: string, date: Date, status: string, attendanceRequestId: string) => {
        const response = await handleAttendanceRequest(enroll, cid, date, status, attendanceRequestId);
        if(response.message == "Approved"){
            toast({
                title: "Attendance Approved",
                description: `Attendance for ${enroll} has been approved`
            })
        }  
        else if(response.message == "Denied"){
            toast({
                title: "Attendance Rejected",
                description: `Attendance for ${enroll} has been rejected`
            })
        }  
        setAttendanceRequests(prev => prev.filter(item => item._id !== attendanceRequestId));
    }

    return (
        <div>
            {attendanceRequests && attendanceRequests?.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Enrollment</TableHead>
                            <TableHead>Batch</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Reason</TableHead>
                            <TableHead>Approve/Deny</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {attendanceRequests?.map((item, idx) => (
                            <Dialog key={idx}>
                                <TableRow className="h-20">
                                    <TableCell>
                                        <div className="flex gap-3 items-center">
                                            <Avatar>
                                                <AvatarImage src={item.profileUrl} width={40} className="rounded-full" />
                                            </Avatar>
                                            <p className="text-base">{item.name}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.enroll}</TableCell>
                                    <TableCell>{item.batch}</TableCell>
                                    <TableCell>{item.course.name}</TableCell>
                                    <TableCell>{formatToddmmyy(item.date)}</TableCell>
                                    <TableCell>
                                        <DialogTrigger asChild>
                                            <Button className="active:scale-95">Click to view</Button>
                                        </DialogTrigger>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-5">
                                            <Button className="bg-green-500 hover:bg-green-600 active:scale-95" onClick={() => handleRequest(item.enroll, item.course.cid, item.date, "approved", item._id)}>Approve</Button>
                                            <Button className="bg-red-500 hover:bg-red-600 active:scale-95" onClick={() => handleRequest(item.enroll, item.course.cid, item.date, "denied", item._id)}>Deny</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="text-xl font-semibold">{item.reason}</DialogTitle>
                                        <DialogDescription>
                                            <div className="flex flex-col gap-5">
                                                {!imageLoaded && (
                                                    <div className="flex justify-center items-center">
                                                        <Loader className='size-6 text-red-700 animate-spin' />
                                                    </div>
                                                )}
                                                <img src={item.proof} onLoad={() => setImageLoaded(true)} className={imageLoaded ? "opacity-100" : "opacity-0"}/>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex items-center justify-center">
                    No Requests
                </div>
            )}
        </div>
    )
}

export default AttendanceRequestTable
