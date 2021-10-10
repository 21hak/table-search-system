import { IResultData } from "../../pages/result";
import { Bar } from "react-chartjs-2";
import React, { useEffect } from "react";

interface IResultBarProps {
  data: IResultData;
}

const ResultBar: React.FC<IResultBarProps> = function ResultBar(props) {
  const data = React.useMemo(
    () => ({
      labels: props.data.map((d) => Object.values(d)[0]),
      //   labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: `${Object.keys(props.data[0])[1]}`,
          //   data: props.data.map((d) => Object.values(d)[1]),
          data: props.data,

          //   data: [12, 19, 3, 5, 2, 3],
          parsing: {
            xAxisKey: "country",
            yAxisKey: "min",
          },

          // you can set indiviual colors for each bar
          //   backgroundColor: [
          //     "rgba(255, 255, 255, 0.6)",
          //     "rgba(255, 255, 255, 0.6)",
          //     "rgba(255, 255, 255, 0.6)",
          //   ],
          borderWidth: 1,
        },
        {
          label: `${Object.keys(props.data[0])[2]}`,
          //   data: props.data.map((d) => Object.values(d)[1]),
          data: props.data,

          //   data: [12, 19, 3, 5, 2, 3],
          parsing: {
            xAxisKey: "country",
            yAxisKey: "max",
          },

          // you can set indiviual colors for each bar
          //   backgroundColor: [
          //     "rgba(255, 255, 255, 0.6)",
          //     "rgba(255, 255, 255, 0.6)",
          //     "rgba(255, 255, 255, 0.6)",
          //   ],
          borderWidth: 1,
        },
      ],
    }),
    [props.data]
  );

  return (
    <div>
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
