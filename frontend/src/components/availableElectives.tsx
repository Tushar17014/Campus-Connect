import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, { useState } from "react"
import { Button } from "./ui/button"

interface Course {
    cid: string
    name: string
    credits: number
}

interface SelectedElectives {
    cid: string,
    name: string
    credits: number
    preference: number
}

const AvailableElectives = ({data, selectedElectives} : {data: Course[], selectedElectives: (value: SelectedElectives[]) => void}) => {
    const [selectedPreferences, setSelectedPreferences] = useState<(number | null)[]>(
        Array(data.length).fill(null)
    )

    const handlePreferenceChange = (index: number, value: number) => {
        const updated = [...selectedPreferences]
        updated[index] = value
        setSelectedPreferences(updated)
    }

    const getAvailableOptions = (index: number): number[] => {
        const allPrefs = Array.from({ length: data.length }, (_, i) => i + 1)
        const usedPrefs = selectedPreferences.filter((_, i) => i !== index)
        return allPrefs.filter(pref => !usedPrefs.includes(pref))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedPreferences.includes(null)) {
            alert("Please select preferences for all subjects.")
            return
        }

        const submittedData = data.map((course, index) => ({
            ...course,
            preference: selectedPreferences[index] ? selectedPreferences[index] : 1,
        }))

        selectedElectives(submittedData);

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Course Code</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Credits</TableHead>
                            <TableHead>Preference</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{item.cid}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.credits}</TableCell>
                                <TableCell>
                                    <select
                                        className='p-3 border rounded-lg bg-black text-center font-medium'
                                        value={selectedPreferences[idx] ?? ""}
                                        onChange={(e) => handlePreferenceChange(idx, Number(e.target.value))}
                                    >
                                        <option value="" disabled>Select</option>
                                        {getAvailableOptions(idx).map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button type="submit" className="mt-5">Freeze Choices</Button>
            </form>
        </div>
    )
}

export default AvailableElectives
