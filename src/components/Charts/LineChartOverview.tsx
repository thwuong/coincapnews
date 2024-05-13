import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
type DataChartType = {
    x: number;
    y: number;
};
type LineChartOverviewProps = {
    data: DataChartType[];
};
function LineChartOverview({ data }: LineChartOverviewProps) {
    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: false,
            },
            height: "400px",
            width: "100%",
        },
        xaxis: {
            type: "datetime",
            // labels: {
            //     show: false,
            // },
            // axisBorder: {
            //     show: false,
            //     strokeWidth: 0,
            // },
            // axisTicks: {
            //     show: false,
            //     borderType: "none",
            // },
        },
        yaxis: {
            // labels: {
            //     show: false,
            // },
            // crosshairs: {
            //     show: false,
            // },
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
    };
    return (
        <Chart
            id="chart-overview"
            options={{
                ...options,

                // colors: isUp ? ["#16C784", "#16C784", "#16C784"] : ["#EA3943", "#EA3943", "#EA3943"],
            }}
            series={[
                {
                    type: "area",
                    data,
                },
            ]}
            type="area"
            width={"100%"}
            height={"400px"}
        />
    );
}

export default LineChartOverview;
