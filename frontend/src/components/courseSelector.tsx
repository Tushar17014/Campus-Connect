interface CourseSelectorProps {
    selectedCourse: (value: string) => void,
    selectAllOption?: boolean,
    availableCourses: { cid: string, name: string }[];
}

const CourseSelector: React.FC<CourseSelectorProps> = ({ selectedCourse, availableCourses, selectAllOption }) => {
    return (
        <div>
            <select className='p-3 border rounded-lg bg-black min-w-[200px] text-center font-medium' onChange={(e) => selectedCourse(e.target.value)}>
                {selectAllOption && (
                    <option key="all" value="All">All</option>
                )}
                {availableCourses.map((item, index) => (
                    <option key={index} value={item.cid}>{item.name}</option>
                ))}
            </select>
        </div>
    )
}

export default CourseSelector
