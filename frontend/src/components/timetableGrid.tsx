import React from 'react';
import { Button } from './ui/button';
import { days, hours } from '@/constants';

declare interface TimetableGridProps{
    freeSlots: number[][],
    scheduleExtraClass: (day: number, time: number) => void
}

const TimetableGrid = ({freeSlots, scheduleExtraClass} : TimetableGridProps) => {
    return (
        <div className="p-4">
            <div className="grid grid-cols-[80px_repeat(5,1fr)] auto-rows-[60px] border border-white/20 rounded-lg overflow-hidden shadow-md">
                {/* Header Row */}
                <div className="bg-black border-r border-b border-white/20 flex items-center justify-center font-semibold">
                    Time
                </div>
                {days.map((day) => (
                    <div
                        key={day}
                        className="bg-black border-r border-b border-white/20 flex items-center justify-center font-semibold"
                    >
                        {day}
                    </div>
                ))}

                {/* Time Rows */}
                {hours.map((hour) => (
                    <React.Fragment key={hour}>
                        {/* Time Label Column */}
                        <div className="border-r border-b border-white/20 text-sm text-white flex items-center justify-center bg-black">
                            {hour}:00
                        </div>

                        {/* Grid Cells */}
                        {days.map((day, idx) => {
                            if ( freeSlots.length > 0 && freeSlots[idx].includes(hour)) {
                                return <div
                                    key={`${day}-${hour}`}
                                    className="border-r border-b border-white/20 transition duration-150 flex items-center justify-center"
                                >
                                    <Button onClick={() => scheduleExtraClass(idx, hour)}>Schedule Class</Button>
                                </div>
                            }
                            return <div
                                key={`${day}-${hour}`}
                                className="border-r border-b border-white/20 transition duration-150 flex items-center justify-center"
                            >
                            </div>
                        })}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default TimetableGrid;
