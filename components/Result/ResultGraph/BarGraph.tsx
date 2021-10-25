import { IResultData, ISelect, ISQL } from "../../../pages/result";
import { Bar, Chart } from "react-chartjs-2";
import React, { useEffect, useRef, useState } from "react";

interface IResultBarProps {
  data: IResultData;
  sql: ISQL;
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
  // const [labelColumns, setLabelColumns] = useState<string[]>([]);
  // const [dataColumns, setDataColumns] = useState<string[]>([]);
  // const [label, setLabel] = useState<string>();
  // const [values, setValues] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any>();

  // useEffect(() => {
  //   // groupby가 있을 때
  //   if (props.sql.groupby.length) {
  //     setLabelColumns(props.sql.groupby);
  //     setDataColumns(
  //       props.sql.select
  //         .filter((s) => s.agg !== "NONE")
  //         .map((d) => (d.agg !== "NONE" ? d.agg.toLowerCase() : d.column))
  //     );
  //   } else {
  //     // groupby가 없을 때
  //     setLabelColumns(
  //       Object.entries(props.data[0])
  //         .filter(([k, v]) => typeof v === "string")
  //         .map(([k, v]) => k)
  //     );
  //     setDataColumns(
  //       Object.entries(props.data[0])
  //         .filter(([k, v]) => typeof v === "number")
  //         .map(([k, v]) => k)
  //     );
  //   }
  // }, [props.data]);

  // useEffect(() => {
  //   if (labelColumns.length) {
  //     setLabel(labelColumns[0].split(".")[1] ?? labelColumns[0]);
  //   }
  // }, [labelColumns.length]);

  // useEffect(() => {
  //   setValues(dataColumns);
  // }, [dataColumns.length]);

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
