import ModalContext from "context/modal-context";
import QueryContext from "context/query-context";
import React, { HTMLProps, useContext, useEffect, useState } from "react";

import { Modal } from "./Modal";
import Autocomplete from "react-autocomplete";
import { matchColumn } from "utils";
import ResultContext from "context/result-context";

interface ISelectModalProps {}
// count, sum, min, max, avg, stddev, array_agg
const funcRecommendations = [
  "COUNT",
  "SUM",
  "MIN",
  "MAX",
  "AVG",
  "STDDEV",
  "ARRAY_AGG",
];
export const SelectModal: React.FC<ISelectModalProps> = (props) => {
  const { selectModal } = useContext(ModalContext);
  const { recommendations } = useContext(ResultContext);
  const { query, postSQL } = useContext(QueryContext);
  const [select, setSelect] = useState<string>("");
  const [func, setFunc] = useState<string>("");

  const onSubmit = () => {
    const s = query.select.concat([
      {
        column: select,
        agg: func ? func.toUpperCase() : "NONE",
      },
    ]);
    setSelect("");
    setFunc("");
    postSQL({ ...query, select: s });
    selectModal.setVisible(false);
  };

  return (
    <Modal
      onClose={() => {
        selectModal.setVisible(false);
      }}
      maskClosable={true}
      closable={true}
      visible={selectModal.visible}>
      <div className="p-4 shadow">
        <div className="pb-1">
          <SearchInput
            className="pb-1"
            placeholder="column"
            recommendations={recommendations}
            value={select}
            onChange={(value) => setSelect(value)}
          />
        </div>
        <SearchInput
          placeholder="function"
          recommendations={funcRecommendations}
          value={func}
          onChange={(value) => setFunc(value)}
        />
        {/* buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            className="border border-gray-900 p-1 flex-grow mr-2"
            onClick={onSubmit}>
            Search
          </button>
          <button
            type="button"
            className="border border-gray-900 p-1 flex-grow"
            onClick={(e) => {
              selectModal.setVisible(false);
            }}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

interface ISearchInputProps extends HTMLProps<HTMLInputElement> {
  recommendations: string[];
  value: string;
  onChange: (value: any) => void;
}

const SearchInput: React.FC<ISearchInputProps> = React.forwardRef(
  ({ children, recommendations, onChange, value, ...props }, ref) => {
    return (
      // {/* input */}
      <div className="flex border border-gray-500 w-full bg-white">
        <Autocomplete
          ref={ref}
          value={value}
          inputProps={{
            ...props,
            id: "states-autocomplete",
            className: "focus:outline-none p-1 w-full",
          }}
          wrapperStyle={{
            // position: "relative",
            display: "inline-block",
            flexGrow: 1,
            // zIndex: 1,
          }}
          items={recommendations}
          getItemValue={(item: any) => item}
          shouldItemRender={matchColumn}
          // sortItems={sortStates}
          onChange={(event, value) => onChange(value)}
          onSelect={onChange}
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
      </div>
    );
  }
);
