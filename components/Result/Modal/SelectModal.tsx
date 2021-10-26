import ModalContext from "context/modal-context";
import QueryContext from "context/query-context";
import StoreContext from "context/store-context";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "./Modal";
import Autocomplete from "react-autocomplete";
import { matchColumn } from "utils";
import ResultContext from "context/result-context";

interface ISelectModalProps {}
const funcRecommendations = ["MAX", "MIN"];
export const SelectModal: React.FC<ISelectModalProps> = (props) => {
  const { selectModal } = useContext(ModalContext);
  const { recommendations } = useContext(ResultContext);
  const { query, setQuery } = useContext(QueryContext);
  const [select, setSelect] = useState<string>("");
  const [func, setFunc] = useState<string>("");

  return (
    <Modal
      onClose={() => {
        selectModal.setVisible(false);
      }}
      maskClosable={true}
      closable={true}
      visible={selectModal.visible}>
      <div className="p-4 h-40 shadow">
        <SearchInput
          recommendations={recommendations}
          onSelect={(value) => setSelect(value)}
        />
        <SearchInput
          recommendations={funcRecommendations}
          onSelect={(value) => setFunc(value)}
        />
        <button
          onClick={(e) => {
            query.select.push({ column: select, agg: func.toUpperCase() });
            setQuery({ ...query, select: query.select });
          }}>
          Search
        </button>
      </div>
    </Modal>
  );
};

interface ISearchInputProps {
  recommendations: string[];
  onSelect: (value: any) => void;
}

const SearchInput: React.FC<ISearchInputProps> = ({ children, ...props }) => {
  const [input, setInput] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    props.onSelect(input);
  }, [input]);

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
        items={props.recommendations}
        getItemValue={(item: any) => item}
        shouldItemRender={matchColumn}
        // sortItems={sortStates}
        onChange={(event, value) => setInput(value)}
        onSelect={setInput}
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
        onClick={() => props.onSelect(input)}>
        Enter
      </button>
    </div>
  );
};
