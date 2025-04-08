import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface Course {
    cid: string
    name: string
    credits: number
    preference: number
}

const ChosenElectives = ({ data }: { data: Course[] }) => {
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Preference</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.map((item, idx) => (
                        <TableRow key={idx} className="h-16">
                            <TableCell>{item.cid}</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.credits}</TableCell>
                            <TableCell>{item.preference}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default ChosenElectives
