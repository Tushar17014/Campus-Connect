import { Card, CardContent, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"
import StudentTable from "./studentTable"
import '../scrollbar.css'
import { StudentTablePropsArray } from "@/types"

const StudentListWidget = ({data}: StudentTablePropsArray) => {
    return (
        <Card className="bg-mainbg max-h-[600px] min-h-[600px] overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
            <CardHeader >
                <h3 className="text-xl font-semibold">Students</h3>
            </CardHeader>

            <Separator className="mb-5" />

            <CardContent>
                <StudentTable data={data}/>    
            </CardContent>

        </Card>
    )
}

export default StudentListWidget
