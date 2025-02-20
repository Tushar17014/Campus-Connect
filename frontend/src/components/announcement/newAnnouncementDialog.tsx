import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader, PlusSquare } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useEffect, useState } from "react"
import { makeAnnouncement } from "@/apis/announcement"
import CourseSelector from "../courseSelector"

interface NewAnnouncementDialogProps {
    uid: string,
    availableCourses?: { cid: string, name: string }[],
    onNewAnnouncement: (announcement: any) => void;
}

const NewAnnouncementDialog = ({ uid, onNewAnnouncement, availableCourses }: NewAnnouncementDialogProps) => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (title && message && selectedCourse) {
            const newAnnouncement = await makeAnnouncement(title, message, uid, selectedCourse);
            if (newAnnouncement.data) {
                onNewAnnouncement(newAnnouncement.data);
            }
            setDialogOpen(false);
        }
    }

    useEffect(() => {
        if (!selectedCourse && availableCourses) {
            setSelectedCourse(availableCourses[0].cid);
        }
    }, [availableCourses]);


    return (
        <div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <div className="p-2 hover:bg-white/5 rounded-lg hover:scale-105 active:scale-95 cursor-pointer" onClick={() => setDialogOpen(true)}>
                        <PlusSquare size={30} />
                    </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    {availableCourses ? (
                        <div>
                            <DialogHeader>
                                <DialogTitle>Make Announcement</DialogTitle>
                                <DialogDescription>
                                    Make a new announcement here. It will be reflected on every student of that course.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Course
                                        </Label>
                                        <CourseSelector availableCourses={availableCourses} selectedCourse={(value) => setSelectedCourse(value)} />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Title
                                        </Label>
                                        <Input
                                            placeholder="Announcement Title"
                                            className="col-span-3"
                                            required
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Message
                                        </Label>
                                        <Textarea
                                            placeholder="Type your announcement here!"
                                            className="col-span-3 row-span-1"
                                            required
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button type="submit">
                                        Submit
                                    </Button>
                                </DialogFooter>
                            </form>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center">
                            <Loader className='size-6 text-red-700 animate-spin' />
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default NewAnnouncementDialog
