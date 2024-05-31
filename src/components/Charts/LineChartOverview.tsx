import { formatCurrency } from "@/app/utils/formatCurrency";
import { useAppSelector } from "@/lib/hooks";
import { ApexOptions } from "apexcharts";
import Chart from "react-apexcharts";
type DataChartType = {
    x: number;
    y: number;
};
type LineChartOverviewProps = {
    data: DataChartType[];
    isUp?: boolean;
};
function formatNumberWithSuffix(number: string) {
    const suffixes = ["", "K", "M", "B", "T"];
    const exponent = Math.floor(Math.log(Math.abs(Number(number))) / Math.log(1000));
    const adjustedNumber = Number(number) / Math.pow(1000, exponent);
    let formattedNumber = adjustedNumber.toFixed(1); // Adjust as needed for decimal places

    // Handle edge cases for very small numbers
    if (adjustedNumber < 1) {
        formattedNumber = adjustedNumber.toString();
    }

    return formattedNumber + suffixes[exponent];
}
function LineChartOverview({ data, isUp = false }: LineChartOverviewProps) {
    const currentLanguage = useAppSelector((state) => state.globalStore.currentLanguage);
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
            // crosshairs: {
            //     show: false,
            // },
            labels: {
                formatter(val, opts) {
                    return formatCurrency(val, "USD", currentLanguage, {
                        maximumFractionDigits: 6,
                        minimumIntegerDigits: 1,
                        notation: "compact",
                    });
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            x: {
                format: "dd MMM yyyy",
            },
        },
        grid: {
            show: false,
        },
        stroke: {
            width: 1,
        },
    };
    return (
        <Chart
            id="chart-overview"
            options={{
                ...options,

                colors: isUp ? ["#16C784", "#16C784", "#16C784"] : ["#EA3943", "#EA3943", "#EA3943"],
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
