import { IResultData, ISQL } from "../../pages/result";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { BACKGROUND_COLOR, BORDER_COLOR } from "../ResultBar";

interface IResultPieProps {
  data: IResultData;
  sql: ISQL;
}

const ResultPie: React.FC<IResultPieProps> = function ResultPie(props) {
  // const labelColumns = props.sql.groupby;
  // const dataColumns = props.sql.select.filter((s) => s.agg !== "NONE");
  const [labelColumns, setLabelColumns] = useState<string[]>([]);
  const [dataColumns, setDataColumns] = useState<string[]>([]);
  const [label, setLabel] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    // groupby가 있을 때
    if (props.sql.groupby.length) {
      setLabelColumns(props.sql.groupby);
      setDataColumns(
        props.sql.select
          .filter((s) => s.agg !== "NONE")
          .map((d) => (d.agg !== "NONE" ? d.agg.toLowerCase() : d.column))
      );
    } else {
      // groupby가 없을 때
      setLabelColumns(
        Object.entries(props.data[0])
          .filter(([k, v]) => typeof v === "string")
          .map(([k, v]) => k)
      );
      setDataColumns(
        Object.entries(props.data[0])
          .filter(([k, v]) => typeof v === "number")
          .map(([k, v]) => k)
      );
    }
  }, [props.data]);

  useEffect(() => {
    if (labelColumns.length) {
      setLabel(labelColumns[0].split(".")[1] ?? labelColumns[0]);
    }
  }, [labelColumns.length]);

  useEffect(() => {
    setValue(dataColumns[0]);
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
