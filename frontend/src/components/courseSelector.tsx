interface CourseSelectorProps {
    selectedCourse: (value: string) => void,
    availableCourses: { cid: string, name: string }[];
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ selectedCourse, availableCourses }) => {
    return (
        <div>
            <select className='p-3 border rounded-lg bg-black min-w-[200px] text-center font-medium' onChange={(e) => selectedCourse(e.target.value)}>
                {availableCourses.map((item, index) => (
                    <option key={index} value={item.cid}>{item.name}</option>
                ))}
            </select>
        </div>
    )
}

export default CourseSelector
