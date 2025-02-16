import { Card, CardContent, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { AgCharts } from 'ag-charts-react';

interface PieChartComponentData{
    present: number
}

const PieChartComponent = ({present} : PieChartComponentData) => {
    const chartOptions = {
        data: [
            { status: 'Present', value: present },
            { status: 'Absent', value: Number((100 - present).toFixed(1)) },
        ],
        series: [{ type: 'donut', calloutLabelKey: 'status', calloutLabel: {color: 'white'}, angleKey: 'value', innerRadiusRatio: 0.7 , showInLegend: false}],
        background: {
            fill: '#19191c'
        },
    };
    return (
        <Card className="bg-mainbg max-h-[450px] min-h-[450px]">
            <CardHeader >
                <h3 className="text-xl font-semibold">Attendance Chart</h3>
            </CardHeader>

            <Separator className="mb-5" />

            <CardContent>
                <AgCharts options={chartOptions} />
            </CardContent>
        </Card>
    )
}

export default PieChartComponent
