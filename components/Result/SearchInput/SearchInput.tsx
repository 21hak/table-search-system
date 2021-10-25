import { useContext, useState } from "react";
import Autocomplete from "react-autocomplete";
import { useForm } from "react-hook-form";
import QueryContext from "../../../context/query-context";
import ResultContext from "../../../context/result-context";
import { matchColumn } from "../../../utils";
interface ISearchInputProps {}
const SearchInput: React.FC<ISearchInputProps> = ({ children, ...props }) => {
  const { query, setQuery } = useContext(QueryContext);
  const { recommendations } = useContext(ResultContext);
  const [input, setInput] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const onSelect = (data: any) => {
    query.select.push({ column: data, agg: "NONE" });
    setQuery({ ...query, select: query.select });
  };

  return (
    // {/* input */}
    <div className="flex border border-gray-500 rounded w-full bg-white">
      <Autocomplete
        {...register("query", {
          validate: (value) => value !== "",
        })}
        value={input}
        inputProps={{
          id: "states-autocomplete",
          className: "focus:outline-none p-1 rounded-l w-full",
        }}
        wrapperStyle={{
          position: "relative",
          display: "inline-block",
          flexGrow: 1,
          zIndex: 1,
        }}
        items={recommendations}
        getItemValue={(item: any) => item}
        shouldItemRender={matchColumn}
        // sortItems={sortStates}
        onChange={(event, value) => setInput(value)}
        onSelect={onSelect}
        renderMenu={(children) => (
          <div className="absolute box-border border border-gray-300 bg-indigo-50">
            {children}
          </div>
        )}
        renderItem={(item: any, isHighlighted: boolean) => (
          <div
            className={`p-1 cursor-pointer ${
              isHighlighted ? "text-white bg-blue-600" : ""
            }`}
            key={item}>
            {item}
          </div>
        )}
      />
      <button
        className="bg-blue-600 text-white m-0.5 pr-1 pl-1 rounded"
        onClick={() => onSelect(input)}>
        Enter
      </button>
    </div>
  );
};

export default SearchInput;
