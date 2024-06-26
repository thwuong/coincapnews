import { ApexOptions } from "apexcharts";
import { useMemo } from "react";
import Chart from "react-apexcharts";
type LineChartLastDaysProps = {
    data: number[];
    isUp: boolean;
};
function LineChartLastDays({ data, isUp }: LineChartLastDaysProps) {
    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false,
            },
            height: "90px",
            width: "164px",
            animations: {
                enabled: false,
            },
        },
        xaxis: {
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
                strokeWidth: 0,
            },
            axisTicks: {
                show: false,
                borderType: "none",
            },
        },
        yaxis: {
            labels: {
                show: false,
            },
            crosshairs: {
                show: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: false,
        },
        grid: {
            show: false,
        },
        stroke: {
            width: 1,
        },
        markers: {
            size: 0,
        },
    };
    const props = useMemo(() => {
        return {
            options: {
                ...options,
                colors: isUp ? ["#16C784", "#16C784", "#16C784"] : ["#EA3943", "#EA3943", "#EA3943"],
            },
            series: [
                {
                    data,
                },
            ],
        };
    }, [data, isUp]);
    return <Chart id="chart-last-days" {...props} type="area" width={"100%"} height={"120"} />;
}

export default LineChartLastDays;
