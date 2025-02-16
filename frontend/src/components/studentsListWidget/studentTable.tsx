import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { StudentTablePropsArray } from "@/types"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"

const StudentTable = ({data} : StudentTablePropsArray) => {

    // const data2 = [
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: true
    //     },
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: true
    //     },
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: true
    //     },
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: true
    //     },
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: true
    //     },
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: true
    //     },
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: true
    //     },
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: true
    //     },
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: true
    //     },
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: false
    //     },
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: true
    //     },
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: false
    //     },
    //     {
    //         firstName: "Tushar",
    //         lastName: "Sharma",
    //         enroll: 21103041,
    //         userPhoto: "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=2534",
    //         gender: "Male",
    //         batch: "B2",
    //         status: true
    //     },
    // ]
    return (
        <div>
            {data && data?.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Enrollment</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Batch</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item, idx) => (
                            <TableRow key={idx} className="h-20">
                                <TableCell>
                                    <div className="flex gap-3 items-center">
                                        <Avatar>
                                            <AvatarImage src={item.profileUrl} width={40} className="rounded-full"/>
                                        </Avatar>
                                        <p className="text-base">{item.name}</p>
                                    </div>
                                </TableCell>
                                <TableCell>{item.enroll}</TableCell>
                                <TableCell>{item.gender}</TableCell>
                                <TableCell>{item.batch}</TableCell>
                                <TableCell>
                                    <div>
                                        {item.status ? (
                                            <p className="text-green-500">Present</p>
                                        ) : (
                                            <p className="text-red-500">Absent</p>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex items-center justify-center">
                    No Records
                </div>    
            )}
        </div>
    )
}

export default StudentTable
