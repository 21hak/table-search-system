import { useRouter } from "next/router";
import { HTMLProps, useContext, useEffect, useState } from "react";
import Autocomplete from "react-autocomplete";
import { useForm } from "react-hook-form";
import QueryContext from "../../../context/query-context";
import ResultContext from "../../../context/result-context";
import { matchColumn } from "../../../utils";
interface ISearchInputProps {}
const SearchInput: React.FC<ISearchInputProps> = ({ children, ...props }) => {
  const { nlQuery, setNlQuery, rawQuery } = useContext(QueryContext);
  const router = useRouter();
  const { recommendations } = useContext(ResultContext);
  const [tempNlQuery, setTempNlQuery] = useState(nlQuery);
  const [tempRawQuery, setTempRawQuery] = useState(rawQuery);
  const [toggle, setToggle] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (nlQuery) {
      setTempNlQuery(nlQuery);
      setTempRawQuery(rawQuery);
    }
  }, [nlQuery]);

  useEffect(() => {
    if (rawQuery) {
      setTempRawQuery(rawQuery);
    }
  }, [rawQuery]);
  return (
    // {/* input */}
    <>
      <div className="flex justify-center mb-2">
        <button
          className="pr-4 pl-4 rounded  border border-gray-600"
          onClick={onToggle}>
          Toggle
        </button>
      </div>

      <div className={"flex w-full " + (toggle ? "hidden" : "")}>
        <div className="mr-4 w-full">
          <QueryArea
            value={tempNlQuery}
            placeholder="Natural Language"
            onChange={(e) => {
              const target = e.target as HTMLTextAreaElement;
              setTempNlQuery(target.value);
            }}
          />
          <div className="flex justify-end mt-1">
            <button
              onClick={() => {
                router.push(
                  {
                    pathname: "/result",
                    query: { nlQuery: tempNlQuery },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
              type="button"
              className="bg-white inline-block p-1 cursor-pointer select-none border border-gray-400 mr-1">
              Execute
            </button>
            <button
              onClick={() => {
                setTempNlQuery("");
              }}
              type="button"
              className="bg-white inline-block p-1 cursor-pointer select-none border border-gray-400">
              Clear
            </button>
          </div>
        </div>
        <div className="w-full">
          <QueryArea
            placeholder="Raw Query"
            value={tempRawQuery}
            onChange={(e) => {
              const target = e.target as HTMLTextAreaElement;
              setTempRawQuery(target.value);
            }}
          />
          <div className="flex justify-end mt-1">
            <button
              onClick={() => {
                console.log("Raw query Executed");
              }}
              type="button"
              className="bg-white inline-block p-1 cursor-pointer select-none border border-gray-400 mr-1">
              Execute
            </button>
            <button
              onClick={() => {
                setTempRawQuery("");
              }}
              type="button"
              className="bg-white inline-block p-1 cursor-pointer select-none border border-gray-400">
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchInput;

interface ITextArea extends HTMLProps<HTMLTextAreaElement> {}
const QueryArea: React.FC<ITextArea> = (props) => {
  return (
    <div className="w-full bg-white border border-gray-500 p-2 h-24">
      <textarea
        {...props}
        className="w-full h-full focus:outline-none resize-none"
      />
    </div>
  );
};
