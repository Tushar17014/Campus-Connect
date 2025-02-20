import { HomeCardGridProps, HomeCardProps } from "@/types"
import HomeCard from "./homeCard"
import { GraduationCap, School, TrendingDown, TrendingUp,  } from "lucide-react"
import { useEffect, useState } from "react"

const HomeCardGrid = ({absent, classes, present, students, userType, studentPresent, studentPresentCount, studentAbsentCount, studentClasses} : HomeCardGridProps) => {
    const [HomeCardData, setHomeCardData] = useState<HomeCardProps[] | null>(null);

    useEffect(() => {
        if(userType == "teacher"){
            setHomeCardData([
                {
                    content: `${students}`,
                    title: "Total Students",
                    Icon: GraduationCap,
                    style: "text-blue-500",
                },
                {
                    content: `${present}%`,
                    title: "Present",
                    Icon: TrendingUp,
                    style: "text-green-500",
                },
                {
                    content: `${absent}%`,
                    title: "Absent",
                    Icon: TrendingDown,
                    style: "text-red-500",
                },
                {
                    content: `${classes}`,
                    title: "Classes",
                    Icon: School,
                    style: "text-purple-500",
                },
            ]);
        }
        else if(userType == "student"){
            setHomeCardData([
                {
                    content: `${studentPresent}%`,
                    title: "Attendance",
                    Icon: GraduationCap,
                    style: "text-blue-500",
                },
                {
                    content: `${studentPresentCount}`,
                    title: "Classes Attended",
                    Icon: TrendingUp,
                    style: "text-green-500",
                },
                {
                    content: `${studentAbsentCount}`,
                    title: "Classes Missed",
                    Icon: TrendingDown,
                    style: "text-red-500",
                },
                {
                    content: `${studentClasses}`,
                    title: "Total Classes",
                    Icon: School,
                    style: "text-purple-500",
                },
            ]);
        }
    }, [absent, classes, present, students, userType, studentPresent, studentPresentCount, studentAbsentCount, studentClasses]);

    return (
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
            {HomeCardData?.map((item, idx) => (
                <HomeCard Icon={item.Icon} content={item.content} title={item.title} style={item.style} key={idx}/>
            ))}
        </div>
    )
}

export default HomeCardGrid
