import { IResultData, ISQL } from "../../pages/result";
import { Bar } from "react-chartjs-2";
import React, { useEffect, useState } from "react";

interface IResultBarProps {
  data: IResultData;
  sql: ISQL;
}

const ResultBar: React.FC<IResultBarProps> = function ResultBar(props) {
  const labelColumns = props.sql.groupby;
  const dataColumns = props.sql.select.filter((s) => s.agg !== "NONE");
  const [label, setLabel] = useState(labelColumns[0].split(".")[1]);

  const [values, setValues] = useState<string[]>([
    dataColumns[0].agg.toLowerCase(),
    dataColumns[1].agg.toLowerCase(),
  ]);

  const data = React.useMemo(
    () => ({
      labels: props.data.map((d) => d[label]),
      datasets: values.map((v) => ({
        label: v,
        data: props.data,

        parsing: {
          xAxisKey: label,
          yAxisKey: v,
        },

        // you can set indiviual colors for each bar
        //   backgroundColor: [
        //     "rgba(255, 255, 255, 0.6)",
        //     "rgba(255, 255, 255, 0.6)",
        //     "rgba(255, 255, 255, 0.6)",
        //   ],
        borderWidth: 1,
      })),
    }),
    [props.data]
  );

  return (
    <div className="overflow-auto">
      <Bar
        data={data}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Cryptocurrency prices",
            },
            legend: {
              display: true,
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};
export default ResultBar;
