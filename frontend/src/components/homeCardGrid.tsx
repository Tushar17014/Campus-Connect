import { HomeCardGridProps } from "@/types"
import HomeCard from "./homeCard"
import { GraduationCap, School, TrendingDown, TrendingUp,  } from "lucide-react"

const HomeCardGrid = ({absent, classes, present, students} : HomeCardGridProps) => {
    const HomeCardData = [
        {
            content: `${students}`,
            title: "Total Students",
            Icon: GraduationCap,
            class: "text-blue-500",
        },
        {
            content: `${present}%`,
            title: "Present",
            Icon: TrendingUp,
            class: "text-green-500",
        },
        {
            content: `${absent}%`,
            title: "Absent",
            Icon: TrendingDown,
            class: "text-red-500",
        },
        {
            content: `${classes}`,
            title: "Classes",
            Icon: School,
            class: "text-purple-500",
        },
    ]
    return (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {HomeCardData.map((item, idx) => (
                <HomeCard Icon={item.Icon} content={item.content} title={item.title} style={item.class} key={idx}/>
            ))}
        </div>
    )
}

export default HomeCardGrid
