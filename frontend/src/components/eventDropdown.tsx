import { formatToddmmyy } from "@/lib/utils";
import { useState } from "react";

interface EventSelectorProps {
    selectedData: (value: string) => void,
    selectOneOption?: boolean,
    selectOneOptionData?: string,
    data: string[],
    isDate?: boolean;
}

const EventSelector: React.FC<EventSelectorProps> = ({ selectedData, data, selectOneOption, selectOneOptionData, isDate = false }) => {
    const [selectedValue, setSelectedValue] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedValue(value);
        selectedData(value);
    };

    return (
        <div>
            <select className='p-3 border rounded-lg bg-black min-w-[200px] text-center font-medium' onChange={handleChange} value={selectedValue}>
                {selectOneOption && (
                    <option value="" disabled>Select {selectOneOptionData}</option>
                )}
                {data.map((item, index) => {
                    if (isDate) {
                        return <option key={index} value={new Date(item).toISOString()}>{formatToddmmyy(new Date(item))}</option>
                    }
                    return <option key={index} value={item}>{item}</option>
                })}
            </select>
        </div>
    )
}

export default EventSelector
