import { AttendanceRequestTableProps } from "@/types"
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
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { formatToddmmyy } from "@/lib/utils"
import { Button } from "./ui/button"
import { useState } from "react"
import { Loader } from "lucide-react"

const StudentAttendanceRequestTable = ({ data }: AttendanceRequestTableProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, idx) => (
            <Dialog key={idx}>
              <TableRow className="h-20">
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{item.course.name}</TableCell>
                <TableCell>{formatToddmmyy(item.date)}</TableCell>
                <TableCell>
                  <DialogTrigger asChild>
                    <Button className="active:scale-95">Click to view</Button>
                  </DialogTrigger>
                </TableCell>
                <TableCell className={`${item.status === "pending" ? "text-yellow-500" :
                    item.status === "approved" ? "text-green-500" :
                      item.status === "denied" && "text-red-500" 
                  }`}>
                  {item.status}
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
                      <img src={item.proof} onLoad={() => setImageLoaded(true)} className={imageLoaded ? "opacity-100" : "opacity-0"} />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default StudentAttendanceRequestTable
