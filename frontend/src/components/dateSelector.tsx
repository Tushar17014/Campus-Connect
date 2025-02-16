import { useEffect, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { CalendarDays } from 'lucide-react'
import { addDays } from 'date-fns';
import moment from 'moment/moment';
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from '@/lib/utils';

interface DateSelectionProps {
    selectedDate: (value: { day: string, isoDate: string }) => void;
}



const DateSelector: React.FC<DateSelectionProps> = ({ selectedDate }) => {

    const nextDate = addDays(new Date(), 0);

    const [date, setDate] = useState(nextDate);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        let tempDate = formatDate(date);
        selectedDate(tempDate)
    }, [date]);

    const handleDateSelect = (selectedDate:any) => {
        setDate(selectedDate);
        setIsOpen(false);
    };
    return (
        <div>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <Button variant="outline" className="flex gap-2 items-center text-white p-6 text-lg">
                        <CalendarDays className='h-8 w-8' />
                        {moment(date).format('DD MMM')}
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={handleDateSelect}
                        className="flex flex-1 justify-center"
                    />
                </PopoverContent>
            </Popover>

        </div>
    )
}

export default DateSelector
