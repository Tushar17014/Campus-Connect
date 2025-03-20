import { getLecturesById } from "@/apis/lectures";
import FormatSummary from "@/components/formatSummary";
import Header from "@/components/header";
import MainLoader from "@/components/mainLoader";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LectureSummariesProps } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LectureSummary = () => {
    const { lectureId } = useParams();
    const [lectureSummary, setLectureSummary] = useState<LectureSummariesProps | null>(null);

    useEffect(() => {
        if (lectureId && lectureId.length > 0) {
            const fetchRecords = async () => {
                const res = await getLecturesById(lectureId);
                setLectureSummary(res);
            };
            fetchRecords();
        }
    }, [lectureId]);

    return (
        <div className="flex-1 overflow-auto relative">
            {lectureSummary ? (
                <div className="flex-1 overflow-auto relative">
                    <Header title={`${lectureSummary.name} Summary`} title2={lectureSummary.course.name}/>
                    <Card className="bg-mainbg max-h-[640px] min-h-[640px] m-5 overflow-y-hidden hover:overflow-y-auto custom-scrollbar">
                        <CardHeader >
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-semibold">Summary:</h3>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <FormatSummary summary={lectureSummary.summary} />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <MainLoader />
            )}
        </div>
    )
}

export default LectureSummary
