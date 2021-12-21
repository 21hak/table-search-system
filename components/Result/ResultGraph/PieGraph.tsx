import { Pie } from "react-chartjs-2";
import React, { useEffect, useState } from "react";
import { BACKGROUND_COLOR, BORDER_COLOR } from "./BarGraph";
import { IResultData } from "context/result-context";

interface IResultPieProps {
  data: IResultData;
  label: string;
  value: string;
}

const ResultPie: React.FC<IResultPieProps> = function ResultPie(props) {
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    setChartData({
      labels: props.label ? props.data.map((d) => d[props.label]) : [],
      datasets: [
        {
          label: props.value,
          data: props.data.map((d) => d[props.value]),

          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
          borderWidth: 1,
        },
      ],
    });
  }, [props.label, props.value, props.data]);

  return (
    <div className="overflow-auto">
      {chartData && (
        <Pie
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: props.label,
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
