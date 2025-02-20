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
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { AnnouncementTableProps } from "@/types"
import { formatToddmmyy } from "@/lib/utils";
import { deleteAnnouncement } from "@/apis/announcement";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

interface AnnouncementTablePropsWithData {
    announcementData: AnnouncementTableProps[];
}

const AnnouncementTable = ({ announcementData }: AnnouncementTablePropsWithData) => {

    const [announcements, setAnnouncements] = useState(announcementData);

    const DeleteAnnouncementRecord = async (announcementId: string) => {
        await deleteAnnouncement(announcementId);
        setAnnouncements(prev => prev.filter(item => item._id !== announcementId));
    }
    return (
        <div>
            {announcements.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead className="w-10 text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {announcements.map((item, idx) => (
                            <TableRow key={idx} className="h-14">
                                <TableCell className="font-medium max-w-14 truncate">{formatToddmmyy(item.createdAt)}</TableCell>
                                <TableCell className="truncate max-w-14">{item.course.name}</TableCell>
                                <TableCell className="truncate max-w-20">{item.title}</TableCell>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <TableCell className="max-w-40 truncate cursor-pointer">{item.message}</TableCell>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{item.title}</DialogTitle>
                                            <DialogDescription>
                                                <p>{item.course.name}</p>
                                                <p>{formatToddmmyy(item.createdAt)}</p>
                                            </DialogDescription>
                                        </DialogHeader>
                                        {item.message}
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <TableCell className="flex justify-center items-center h-14">
                                            <Trash2 className="text-red-500 cursor-pointer hover:scale-110 active:scale-90" size={20} />
                                        </TableCell>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Are you sure you want to delete this announcement?</DialogTitle>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <DialogClose className="flex gap-8">
                                                <Button onClick={() => { DeleteAnnouncementRecord(item._id) }}>Yes</Button>
                                                <Button>No</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <div className="flex justify-center items-center text-lg text-white/50">
                    No Announcements yet!
                </div>
            )}
        </div>
    )
}

export default AnnouncementTable
