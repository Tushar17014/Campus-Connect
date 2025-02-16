import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card"
import { HomeCardProps } from "@/types"

const HomeCard = ({content, Icon, title, style} : HomeCardProps) => {
    return (
        <Card className="bg-mainbg border border-white/10 shadow-sm shadow-white/5">
            <CardHeader>
                <div className="flex gap-2 items-center">
                    <Icon size={22} className={style}/>
                    <h2 className="text-gray-100 text-xl">{title}</h2>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-semibold">{content}</p>
            </CardContent>
        </Card>
    )
}

export default HomeCard
