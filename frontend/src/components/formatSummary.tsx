import { useEffect, useState } from 'react'

type formatSummaryProps = {
    heading: string,
    content: string | null
}

const FormatSummary = ({ summary }: { summary: string }) => {
    const [lectureSummary, setLectureSummary] = useState<formatSummaryProps[]>([]);

    useEffect(() => {
        if (summary && summary.length > 0) {
            function extractToJson(line: string) {
                const match = line.match(/\*\*\s*([^:]+:)\s*(.*)/);
                function decodeUnicode(str: string) {
                    return str.replace(/\\u([0-9A-Fa-f]{4})/g, (match, grp) =>
                        String.fromCharCode(parseInt(grp, 16))
                    );
                }
                if (match) {
                    return {
                        heading: decodeUnicode(match[1].trim()),
                        content: decodeUnicode(match[2].trim().slice(3))
                    };
                }
                return null;
            }
            let text = summary.replace(/\\n/g, '\n').slice(1, -1);
            const lines: string[] = text.split("\n").filter(line => line.trim() !== "");
            let formatData: any = [];

            lines.forEach(line => {
                const data = extractToJson(line);
                formatData.push(data);
            });
            setLectureSummary(formatData);
        }
    }, [summary]);
    return (
        <div>
            {lectureSummary && lectureSummary.length > 0 && (
                <div>
                    <ul className='list-disc pl-5'>
                        {lectureSummary.map((item, index) => (
                            item && item?.content && (
                                <li>
                                    <div key={index} className="mb-4">
                                        <p className="font-bold text-lg">{item.heading}</p>
                                        <p className="text-gray-300">{item.content}</p>
                                    </div>
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default FormatSummary
