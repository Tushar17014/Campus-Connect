import { AnnouncementTableProps } from "@/types"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Separator } from "../ui/separator"
import AnnouncementTable from "./announcementTable"
import NewAnnouncementDialog from "./newAnnouncementDialog"
import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/store/store"

interface AnnouncementWidgetsPropsWithData {
    announcementData: AnnouncementTableProps[],
    uid?: string,
    availableCourses?: { cid: string, name: string }[];
}

const AnnouncementsWidget = ({ announcementData, uid, availableCourses }: AnnouncementWidgetsPropsWithData) => {
    const [announcements, setAnnouncements] = useState(announcementData);

    const userType = useSelector((state: RootState) => state.authReducer.userType);

    const handleNewAnnouncement = (newAnnouncement: AnnouncementTableProps) => {
        setAnnouncements(prev => [newAnnouncement, ...prev]);
    }
    return (
        <Card className="bg-mainbg max-h-[450px] min-h-[450px]">
            <CardHeader >
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Announcements</h3>
                    {userType == "teacher" && uid && (
                        <NewAnnouncementDialog uid={uid} onNewAnnouncement={handleNewAnnouncement} availableCourses={availableCourses} />
                    )}
                </div>
            </CardHeader>

            <Separator className="-mt-4 mb-5" />

            <CardContent>
                <AnnouncementTable key={announcements.length} announcementData={announcements} />
            </CardContent>

        </Card>
    )
}

export default AnnouncementsWidget
