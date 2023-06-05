import {
    Chart as ChartJs,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";

ChartJs.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

import { Bar } from "react-chartjs-2";

const Graph = (props: any) => {

    const createHistogramData = (columnData: number[]) => {
        const valObj: any = {};
        columnData.map((val) => {
            if (Object.keys(valObj).includes(val.toString())) {
                valObj[val] += 1;
            } else {
                valObj[val] = 1;
            }
        });
        const dataForGraph = {
            labels: Object.keys(valObj),
            datasets: [{
                label: props?.selectedColumn,
                data: Object.values(valObj),
                borderRadius: 5,
                barThickness: 10,
                backgroundColor: "rgba(255,255,255,0.5)"
            }]
        };
        const optionsForGraph = {
            plugins: {
                legend: {
                    position: "top",
                    align: "end",
                    labels: {
                        display: false,
                        usePointStyle: true
                    },
                    title: {
                        text: props?.selectedColumn,
                        display: true,
                        color: "white",
                        font: {
                            size: 20
                        }
                    }
                }
            }
        }
        return { dataForGraph, optionsForGraph };
    }

    const histogramData: any = createHistogramData(props?.data);

    return (
        <div>
            {
                histogramData &&
                <Bar data={histogramData?.dataForGraph} options={histogramData?.optionsForGraph} />
            }
        </div>
    )
}

export default Graph;