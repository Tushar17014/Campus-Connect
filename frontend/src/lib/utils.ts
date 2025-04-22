import { CoursesProps } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatToddmmyy(date: Date) {
  const newDate = new Date(date);
  return newDate.toLocaleDateString("en-GB");
}

export function formatDate(selectedDate:Date) : { day: string, isoDate: string } {
    let isoDate = selectedDate.toString();
    let day = 'Monday';
    if (selectedDate) {
        const date = new Date(selectedDate.toString().replace(/\s\([^)]+\)$/, ''));
        day = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' });
        // date.setUTCHours(0, 0, 0, 0);
        // isoDate = date.toISOString();
        isoDate = new Intl.DateTimeFormat('en-CA', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date) + "T00:00:00.000Z";
    }
    return { day: day, isoDate: isoDate };
}

export function getCourseNameByCid (cid: string, courses: CoursesProps[]) {
  const course = courses.find(c => c.cid === cid);
  return course?.name;
};