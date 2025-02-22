import { formatToddmmyy } from "@/lib/utils";

interface EventSelectorProps {
    selectedData: (value: string) => void,
    selectOneOption?: boolean,
    data: Date[];
}

const EventSelector: React.FC<EventSelectorProps> = ({ selectedData, data, selectOneOption }) => {
    return (
        <div>
            <select className='p-3 border rounded-lg bg-black min-w-[200px] text-center font-medium' onChange={(e) => selectedData(e.target.value)}>
                {selectOneOption && (
                    <option key="select" value="select">Select Attendace</option>
                )}
                {data.map((item, index) => (
                    <option key={index} value={new Date(item).toISOString()}>{formatToddmmyy(item)}</option>
                ))}
            </select>
        </div>
    )
}

export default EventSelector
