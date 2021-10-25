import { useRouter } from "next/router";
import { useContext } from "react";
import QueryContext from "../../../context/query-context";

interface IResultInterfaceProps {}
const ResultInterface: React.FC<IResultInterfaceProps> = ({
  children,
  ...props
}) => {
  const router = useRouter();
  const onClear = () => {
    router.push({ pathname: "/" });
  };
  const { query, setQuery } = useContext(QueryContext);

  const onRemoveGroupby = (index: number) => {
    query.groupby.splice(index, 1);
    if (query.groupby.length === 0) {
      query.select.forEach((s) => (s.agg = "NONE"));
    }
    setQuery({ ...query, select: query.select, groupby: query.groupby });
    // setModified(true);
  };

  return (
    <>
      {/* result */}
      <div className="flex flex-col mb-2">
        <div className="flex items-start">
          <span className="font-normal w-28 block">Tables</span>
          <div className="flex flex-wrap items-center">
            {query.from.map((table) => (
              <span
                key={table}
                className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
                {table}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-start">
          <span className="font-normal w-28 block">Outputs</span>
          <div className="flex flex-wrap items-center">
            {query.select.map((select, index) => (
              <span
                onClick={() => {
                  query.select.splice(index, 1);
                  setQuery({ ...query, select: query.select });
                  // setModified(true);
                }}
                key={`${select.column}${index}}`}
                className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1 cursor-pointer">
                {`${select.column} ${
                  select.agg !== "NONE" ? `(${select.agg})` : ""
                }`}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-start">
          <span className="font-normal w-28 block">Conditions</span>
          <div className="flex flex-wrap items-center">
            {query.where.map((where, index) => (
              <span
                onClick={() => {
                  query.where.splice(index, 1);
                  setQuery({ ...query, where: query.where });
                  // setModified(true);
                }}
                key={`${where.left}${where.sign}${where.right}`}
                className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1">
                {`${where.left}${where.sign}${where.right}`}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-start">
          <span className="font-normal w-28 block">GroupBy</span>
          <div className="flex flex-wrap items-center">
            {query.groupby.map((groupBy, index) => (
              <span
                // onClick={() => {
                //   query.groupby.splice(index, 1);
                //   setQuery({ ...query, groupby: query.groupby });
                //   setModified(true);
                // }}
                onClick={() => {
                  onRemoveGroupby(index);
                }}
                key={groupBy}
                className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1 cursor-pointer">
                {groupBy}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-2">
        <button
          className="pr-4 pl-4 rounded  border border-gray-600"
          onClick={onClear}>
          Clear
        </button>
      </div>
    </>
  );
};

export default ResultInterface;
