import { IResultData } from "../../pages/result";
import { Pie } from "react-chartjs-2";
import React, { useEffect } from "react";

interface IResultPieProps {
  data: IResultData;
}

const ResultPie: React.FC<IResultPieProps> = function ResultPie(props) {
  const data = React.useMemo(
    () => ({
      labels: props.data.map((d) => Object.values(d)[0]),
      datasets: [
        {
          label: `${Object.keys(props.data[0])[1]}`,
          data: props.data.map((d) => Object.values(d)[1]),

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
    <div>
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
