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
import { LectureSummariesTableProps } from "@/types"
import { formatToddmmyy } from "@/lib/utils"
import { DialogTitle } from "@radix-ui/react-dialog"

const LectureSummaries = ({ data }: LectureSummariesTableProps) => {
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
                                <Dialog key={idx}>
                                    <DialogTrigger asChild>
                                        <TableCell className="max-w-72 truncate cursor-pointer">{item.summary}</TableCell>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle className="text-2xl font-semibold">Summary</DialogTitle>
                                            <DialogDescription>
                                                <div className="flex flex-col gap-5 text-white">
                                                    {item.summary}
                                                </div>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
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

export default LectureSummaries
