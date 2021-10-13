import { IResultData, ISQL } from "../../pages/result";
import { Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";

interface IResultBarProps {
  data: IResultData;
  sql: ISQL;
}
const backgroundColor = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

const ResultBar: React.FC<IResultBarProps> = function ResultBar(props) {
  const labelColumns = props.sql.groupby;
  const dataColumns = props.sql.select.filter((s) => s.agg !== "NONE");
  const [label, setLabel] = useState<string>();
  const [values, setValues] = useState<string[]>([]);
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    if (labelColumns.length) {
      setLabel(labelColumns[0].split(".")[1]);
    }
  }, [labelColumns.length]);

  useEffect(() => {
    setValues(
      dataColumns.map((d) =>
        d.agg !== "NONE" ? d.agg.toLowerCase() : d.column
      )
    );
  }, [dataColumns.length]);

  useEffect(() => {
    setChartData({
      labels: label ? props.data.map((d) => d[label]) : [],
      datasets: values.map((v, index) => ({
        label: v,
        data: props.data,

        parsing: {
          xAxisKey: label,
          yAxisKey: v,
        },

        backgroundColor: backgroundColor[index],
        // borderWidth: 1,
      })),
    });
  }, [label, values.length]);

  return (
    <div className="overflow-auto">
      {chartData && (
        <Bar
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: label,
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
