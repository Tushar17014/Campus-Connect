import { useState } from "react";

interface CourseSelectorProps {
    selectedCourse: (value: string) => void,
    selectAllOption?: boolean,
    selectOneOption?: boolean,
    availableCourses: { cid: string, name: string }[];
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ selectedCourse, availableCourses, selectAllOption, selectOneOption }) => {
    const [selectedValue, setSelectedValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedValue(value);
        selectedCourse(value);
    };
    return (
        <div>
            <select className='p-3 border rounded-lg bg-black min-w-[200px] text-center font-medium' onChange={handleChange} value={selectedValue}>
                {selectAllOption && (
                    <option key="all" value="All">All</option>
                )}
                {selectOneOption && (
                    <option value="" disabled>Select Course</option>
                )}
                {availableCourses.map((item, index) => (
                    <option key={index} value={item.cid}>{item.name}</option>
                ))}
            </select>
        </div>
    )
}

export default CourseSelector
