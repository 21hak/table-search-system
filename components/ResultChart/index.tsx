import { useState } from "react";
import Image from "next/image";
import tablePath from "../../public/table.png";
import pieChartPath from "../../public/pie-chart.png";
import barChartPath from "../../public/bar-chart.png";

interface IResultChartProps {}
const ResultChart: React.FC<IResultChartProps> = function ResultChart(props) {
  return (
    <div className="w-full h-full bg-white border border-gray-400 mt-4 p-4">
      <ChartButtons />
    </div>
  );
};

const ChartButtons: React.FC = function ChartButtons(props) {
  const [activated, setActivated] = useState<"table" | "bar" | "pie">("table");
  return (
    <div className="flex flex-row justify-between items-center rounded border border-gray-500 w-24">
      <button
        type="button"
        className={`flex items-center  p-2 border-r rounded-l border-gray-500 flex-1 ${
          activated === "table" ? "bg-gray-300" : ""
        }`}
        onClick={() => {
          setActivated("table");
        }}>
        <Image src={tablePath} />
      </button>
      <button
        type="button"
        className={`flex items-center  p-2 border-r border-gray-500 flex-1 ${
          activated === "bar" ? "bg-gray-300" : ""
        }`}
        onClick={() => {
          setActivated("bar");
        }}>
        <Image src={barChartPath} />
      </button>
      <button
        type="button"
        className={`flex items-center  p-2  flex-1 rounded-r ${
          activated === "pie" ? "bg-gray-300" : ""
        }`}
        onClick={() => {
          setActivated("pie");
        }}>
        <Image src={pieChartPath} />
      </button>
    </div>
  );
};
export default ResultChart;
