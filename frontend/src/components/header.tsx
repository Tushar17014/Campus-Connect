import CourseSelector from "./courseSelector";
import DateSelector from "./dateSelector";

interface HeaderData{
    title: string,
    selectedDate?: (value: { day: string , isoDate: string }) => void,
    selectedCourse?: (value: string) => void,
    availableCourses?: { cid: string, name: string }[];
}

const Header = ({title, selectedDate, selectedCourse, availableCourses} : HeaderData) => {
    return (
        <header className="bg-mainbg shadow-lg border-b border-[hsl(0 0% 14.9%)] min-h-24 flex items-center justify-between">
            <h1 className="text-2xl font-semibold pl-10">{title}</h1>
            {title == "Dashboard" && selectedDate && availableCourses && selectedCourse &&(
                <div className="pr-10 flex gap-5 items-center">
                    <DateSelector selectedDate={selectedDate}/>
                    <CourseSelector availableCourses={availableCourses} selectedCourse={selectedCourse}/>
                </div>
            )}
        </header>
    )
}

export default Header
