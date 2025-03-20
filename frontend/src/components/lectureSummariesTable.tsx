import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { LectureSummariesTableProps } from "@/types"
import { formatToddmmyy } from "@/lib/utils"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"


const LectureSummariesTable = ({ data }: LectureSummariesTableProps) => {
    const navigate = useNavigate();
    return (
        <div>
            {data && data?.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Summary</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item, idx) => (
                            <TableRow className="h-20" key={idx}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{formatToddmmyy(item.date)}</TableCell>
                                <TableCell>{item.course.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => navigate(`/teacher/lectures/${item._id}`)}>View Summary</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex items-center justify-center">
                    No Lectures Yet
                </div>
            )}
        </div>
    )
}

export default LectureSummariesTable
