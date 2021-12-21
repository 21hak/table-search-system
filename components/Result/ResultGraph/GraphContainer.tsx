import { HTMLProps, useContext, useEffect, useState } from "react";
import Image from "next/image";
import tablePath from "../../../public/table.png";
import pieChartPath from "../../../public/pie-chart.png";
import barChartPath from "../../../public/bar-chart.png";
import sortPath from "../../../public/sort.png";
import ResultTable from "./TableGraph";
import ResultBar from "./BarGraph";
import ResultPie from "./PieGraph";

import { values } from "lodash";
import QueryContext from "../../../context/query-context";
import ResultContext, { IResultData } from "../../../context/result-context";

interface IGraphContainerProps {}
const GraphContainer: React.FC<IGraphContainerProps> = function GraphContainer(
  props
) {
  const [activated, setActivated] = useState<"table" | "bar" | "pie">("table");
  const [labelColumns, setLabelColumns] = useState<string[]>([]);
  const [dataColumns, setDataColumns] = useState<string[]>([]);
  const [label, setLabel] = useState<string>("");
  const [values, setValues] = useState<string[]>([]);

  const { query } = useContext(QueryContext);
  const { data, setData } = useContext(ResultContext);

  useEffect(() => {
    // groupby가 있을 때
    if (query.groupby.length) {
      setLabelColumns(query.groupby);
      setDataColumns(
        query.select
          .filter((s) => s.agg !== "NONE")
          .map((d) => (d.agg !== "NONE" ? d.agg.toLowerCase() : d.column))
      );
    } else {
      // groupby가 없을 때
      setLabelColumns(
        Object.entries(data[0])
          .filter(([k, v]) => typeof v === "string")
          .map(([k, v]) => k)
      );
      setDataColumns(
        Object.entries(data[0])
          .filter(([k, v]) => typeof v === "number")
          .map(([k, v]) => k)
      );
    }
  }, [data]);

  useEffect(() => {
    if (labelColumns.length) {
      setLabel(labelColumns[0].split(".")[1] ?? labelColumns[0]);
    } else setLabel("");
  }, [labelColumns.length]);

  useEffect(() => {
    setValues(dataColumns);
  }, [dataColumns.length]);

  return (
    <div className="w-full h-full bg-white border border-gray-400 mt-4 p-4 overflow-auto">
      <ChartButtons
        activated={activated}
        setActivated={setActivated}
        label={label}
        values={values}
        className="mb-1"
      />
      <UtilButtons
        values={values}
        data={data}
        label={label}
        setData={setData}
      />
      <div className="p-4">
        {activated === "table" ? (
          <ResultTable data={data} />
        ) : activated === "bar" ? (
          <ResultBar data={data} label={label} values={values} />
        ) : (
          <ResultPie
            data={data}
            label={label}
            value={values[0] ? values[0] : ""}
          />
        )}
      </div>
    </div>
  );
};

interface IChartButtonsProps extends HTMLProps<HTMLDivElement> {
  label: string;
  values: string[];
  activated: "table" | "bar" | "pie";
  setActivated: (chart: "table" | "bar" | "pie") => void;
}

const ChartButtons: React.FC<IChartButtonsProps> = function ChartButtons({
  activated,
  setActivated,
  label,
  values,
  ...props
}) {
  return (
    <div {...props}>
      <div className="inline-flex flex-row justify-between items-center border border-gray-500">
        <button
          type="button"
          className={`flex items-center p-2 border-gray-500 w-8 h-8 ${
            activated === "table" ? "bg-gray-300" : ""
          }`}
          onClick={() => {
            setActivated("table");
          }}>
          <Image src={tablePath} />
        </button>

        {label && values.length > 0 && (
          <button
            type="button"
            className={`flex items-center p-2 border-gray-500 w-8 h-8 ${
              activated === "bar" ? "bg-gray-300" : ""
            }`}
            onClick={() => {
              setActivated("bar");
            }}>
            <Image src={barChartPath} />
          </button>
        )}

        {label && values.length > 0 && (
          <button
            type="button"
            className={`flex items-center p-2  w-8 h-8 ${
              activated === "pie" ? "bg-gray-300" : ""
            }`}
            onClick={() => {
              setActivated("pie");
            }}>
            <Image src={pieChartPath} />
          </button>
        )}
      </div>
    </div>
  );
};

interface IUtilButtonsProps {
  values: string[];
  label: string;
  data: IResultData;
  setData: (data: IResultData) => void;
}

const UtilButtons: React.FC<IUtilButtonsProps> = function UtilButtons(props) {
  const [sortTabVisible, setSortTabVisible] = useState(false);
  const [order, setOrder] = useState<string>("DESC");
  const [criteria, setCriteria] = useState<string>("");
  const onClickSort = () => {
    setSortTabVisible((sortTabVisible) => !sortTabVisible);
  };

  const sortData = (value: string) => {
    props.data.sort((v1, v2) => {
      if (order === "DESC") {
        return v1[value] < v2[value] ? 1 : -1;
      } else {
        return v1[value] >= v2[value] ? 1 : -1;
      }
    });
    props.setData([...props.data]);
  };

  const onClickOrder = () => {
    setOrder((order) => {
      if (order === "ASC") {
        return "DESC";
      } else {
        return "ASC";
      }
    });
  };

  useEffect(() => {
    if (criteria) {
      sortData(criteria);
    }
  }, [criteria, order]);

  return (
    <div className="flex flex-row justify-start">
      <button
        type="button"
        className="p-1 border border-gray-500  relative h-8 mr-1"
        onClick={onClickSort}>
        Sort
        <SortTab
          label={props.label}
          style={{ left: "100%", top: "100%" }}
          visible={sortTabVisible}
          values={props.values}
          setCriteria={setCriteria}
        />
      </button>
      <button
        type="button"
        className="p-1 border border-gray-500  relative w-8 h-8 mr-1"
        onClick={onClickOrder}>
        <Image
          src={sortPath}
          className={"transform " + (order === "ASC" ? "-scale-y-100" : "")}
        />
      </button>
      {criteria && (
        <button
          type="button"
          className="flex items-center p-1 border border-gray-500  relative h-8 text-center"
          onClick={() => setCriteria("")}>
          {criteria}
        </button>
      )}
    </div>
  );
};

interface ISortTabProps extends HTMLProps<HTMLDivElement> {
  visible: boolean;
  values: string[];
  label: string;
  setCriteria: (c: string) => void;
}
const SortTab: React.FC<ISortTabProps> = function SortTab({
  visible,
  values,
  setCriteria,
  ...props
}) {
  const [showFieldSort, setShowFieldSort] = useState(false);

  return (
    <div
      {...props}
      className={
        "absolute border bg-white shadow p-1  " + (visible ? "block" : "hidden")
      }>
      <div
        className="hover:bg-gray-300 pr-2 pl-2 text-left relative"
        onMouseEnter={() => {
          setShowFieldSort(false);
        }}></div>
      <div
        className="hover:bg-gray-300 pr-2 pl-2 text-left"
        onClick={() => {
          setCriteria(props.label);
        }}
        onMouseEnter={() => {
          setShowFieldSort(false);
        }}>
        Alphabetic
      </div>
      <div
        className="hover:bg-gray-300 pr-2 pl-2 text-left relative"
        onMouseEnter={() => {
          setShowFieldSort(true);
        }}>
        Field
        <div
          style={{ left: "100%", top: 0 }}
          className={
            "absolute border bg-white shadow p-1  " +
            (showFieldSort ? "block" : "hidden")
          }>
          {values.map((v) => (
            <div
              className="hover:bg-gray-300 pr-2 pl-2 text-left"
              key={v}
              onClick={() => {
                setCriteria(v);
              }}>
              {v}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphContainer;
