import { Bar, Chart } from "react-chartjs-2";
import React, { useEffect, useRef, useState } from "react";
import { IResultData } from "context/result-context";

interface IResultBarProps {
  data: IResultData;
  label: string;
  values: string[];
}
export const BACKGROUND_COLOR = [
  "rgba(255, 99, 132, 0.5)",
  "rgba(54, 162, 235, 0.5)",
  "rgba(255, 206, 86, 0.5)",
  "rgba(75, 192, 192, 0.5)",
  "rgba(153, 102, 255, 0.5)",
  "rgba(255, 159, 64, 0.5)",
];
export const BORDER_COLOR = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];
// FIXME: sql구문의 select와 data간에 차이가 있음. (select에 중복된 column이 있으면 data에서는 그냥 하나로 보내줌)
// FIXME: data의 컬럼과 sql구문의 column 네이밍 차이

const ResultBar: React.FC<IResultBarProps> = function ResultBar(props) {
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    setChartData({
      labels: props.label ? props.data.map((d) => d[props.label]) : [],
      datasets: props.values.map((v, index) => ({
        label: v,
        data: props.data,

        parsing: {
          xAxisKey: props.label,
          yAxisKey: v,
        },

        backgroundColor: BACKGROUND_COLOR[index],
        borderColor: BORDER_COLOR[index],
        borderWidth: 1,
      })),
    });
  }, [props.label, props.values.length, props.data]);
  const chartRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="overflow-auto">
      {chartData && (
        <Bar
          ref={chartRef}
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: props.label,
                position: "bottom",
              },

              legend: {
                display: true,
                position: "left",
              },
            },
          }}
        />
      )}
    </div>
  );
};
export default ResultBar;
