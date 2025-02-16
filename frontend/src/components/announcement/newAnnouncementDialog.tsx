import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { PlusSquare } from "lucide-react"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { makeAnnouncement } from "@/apis/announcement"
import { DialogClose } from "@radix-ui/react-dialog"

interface NewAnnouncementDialogProps {
    uid: string,
    onNewAnnouncement: (announcement: any) => void;
}

const NewAnnouncementDialog = ({ uid, onNewAnnouncement }: NewAnnouncementDialogProps) => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        const newAnnouncement = await makeAnnouncement(title, message, uid);
        if (newAnnouncement.data){
            onNewAnnouncement(newAnnouncement.data);
        }
        setLoading(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="p-2 hover:bg-white/5 rounded-lg hover:scale-105 active:scale-95 cursor-pointer">
                    <PlusSquare size={30} />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Make Announcement</DialogTitle>
                    <DialogDescription>
                        Make a new announcement here. It will be reflected on each student's dashboard that you teach.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
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
                        <DialogClose>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Submitting..." : "Submit"}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default NewAnnouncementDialog
