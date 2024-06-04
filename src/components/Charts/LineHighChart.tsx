import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useMemo } from "react";
type LineChartLastDaysProps = {
    data: number[];
    isUp: boolean;
};
function LineHighChart({ data, isUp }: LineChartLastDaysProps) {
    const options: Highcharts.Options = useMemo(() => {
        return {
            chart: {
                backgroundColor: "transparent",
                width: 164,
                height: 80,
                reflow: true,
                animation: false,
            },
            xAxis: {
                type: "datetime",
                accessibility: {
                    enabled: false,
                },
                labels: {
                    enabled: false,
                },
                alignTicks: false,
                crosshair: false,
                endOnTick: false,
                startOnTick: false,
                minorGridLineWidth: 0,
                tickWidth: 0,
                lineWidth: 0,
            },
            yAxis: {
                labels: {
                    enabled: false,
                },
                crosshair: false,
                title: {
                    style: {
                        opacity: 0,
                        width: 0,
                    },
                },
                gridLineColor: "rgba(0,0,0,0)",
            },
            legend: {
                enabled: false,
            },
            plotOptions: {
                area: {
                    marker: {
                        enabled: false,
                        states: {
                            hover: {
                                enabled: false, // Tắt marker khi hover
                            },
                        },
                    },
                    lineWidth: 1,
                    threshold: null,
                    states: {
                        hover: {
                            enabled: false,
                        },
                    },
                    animation: false,
                },
            },
            tooltip: {
                enabled: false,
            },
            title: {
                style: {
                    opacity: 0,
                    width: 0,
                    height: 0,
                },
            },
            series: [
                {
                    type: "area",
                    name: "USD to EUR",
                    color: isUp ? "rgba(22, 199, 132,1)" : "rgba(234, 57, 67,1)",
                    fillColor: {
                        stops: isUp
                            ? [
                                  [0, "rgba(22, 199, 132,0.8)"],
                                  [1, "rgba(22, 199, 132,0.2)"],
                              ]
                            : [
                                  [0, "rgba(234, 57, 67,0.8)"],
                                  [1, "rgba(234, 57, 67,0.2)"],
                              ],
                    },
                    data,
                },
            ],
        };
    }, [data, isUp]);
    return (
        <div style={{}} id="highchart-line">
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
}

export default LineHighChart;
