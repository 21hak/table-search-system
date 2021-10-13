import { IResultData, ISQL } from "../../pages/result";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { BACKGROUND_COLOR, BORDER_COLOR } from "../ResultBar";

interface IResultPieProps {
  data: IResultData;
  sql: ISQL;
}

const ResultPie: React.FC<IResultPieProps> = function ResultPie(props) {
  const labelColumns = props.sql.groupby;
  const dataColumns = props.sql.select.filter((s) => s.agg !== "NONE");
  const [label, setLabel] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    if (labelColumns.length) {
      setLabel(labelColumns[0].split(".")[1]);
    }
  }, [labelColumns.length]);

  useEffect(() => {
    dataColumns[0] &&
      setValue(
        dataColumns[0].agg !== "NONE"
          ? dataColumns[0].agg.toLowerCase()
          : dataColumns[0].column
      );
  }, [dataColumns.length]);

  useEffect(() => {
    setChartData({
      labels: label ? props.data.map((d) => d[label]) : [],
      datasets: [
        {
          label: value,
          data: props.data.map((d) => d[value]),

          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
          borderWidth: 1,
        },
      ],
    });
  }, [label, value]);

  return (
    <div className="overflow-auto">
      {chartData && (
        <Pie
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: label,
              },
              legend: {
                display: true,
                position: "bottom",
              },
            },
          }}
        />
      )}
    </div>
  );
};
export default ResultPie;
