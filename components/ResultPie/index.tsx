import { IResultData, ISQL } from "../../pages/result";
import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";

interface IResultPieProps {
  data: IResultData;
  sql: ISQL;
}

const ResultPie: React.FC<IResultPieProps> = function ResultPie(props) {
  const labelColumns = props.sql.groupby;
  const dataColumns = props.sql.select.filter((s) => s.agg !== "NONE");
  const [label, setLabel] = useState(labelColumns[0].split(".")[1]);

  const [value, setValue] = useState<string>(dataColumns[0].agg.toLowerCase());

  const data = React.useMemo(
    () => ({
      labels: props.data.map((d) => d[label]),
      datasets: [
        {
          label: value,
          data: props.data.map((d) => d[value]),

          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    }),
    [props.data]
  );

  return (
    <div className="overflow-auto">
      <Pie
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
export default ResultPie;