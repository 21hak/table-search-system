import ModalContext from "context/modal-context";
import QueryContext from "context/query-context";
import React, { HTMLProps, useContext, useEffect, useState } from "react";

import { Modal } from "./Modal";
import Autocomplete from "react-autocomplete";
import { matchColumn } from "utils";
import ResultContext from "context/result-context";

interface IGroupbyModalProps {}

export const GroupbyModal: React.FC<IGroupbyModalProps> = (props) => {
  const { groupbyModal } = useContext(ModalContext);
  const { query, setQuery } = useContext(QueryContext);
  const [groupby, setGroupby] = useState<string>("");
  const { recommendations } = useContext(ResultContext);

  const onSubmit = () => {
    query.groupby.push(groupby);
    query.select.push({ column: groupby, agg: "NONE" });
    query.select.forEach((select) => {
      if (select.agg === "NONE" && !query.groupby.includes(select.column)) {
        select.agg = "SUM";
      }
    });
    setQuery({ ...query, select: query.select, groupby: query.groupby });
    groupbyModal.setVisible(false);
  };

  return (
    <Modal
      onClose={() => {
        groupbyModal.setVisible(false);
      }}
      maskClosable={true}
      closable={true}
      visible={groupbyModal.visible}>
      <div className="p-4 shadow">
        <div className="pb-1">
          <SearchInput
            className="pb-1"
            placeholder="groupby"
            recommendations={recommendations}
            onSelect={(value) => setGroupby(value)}
          />
        </div>

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
              groupbyModal.setVisible(false);
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
  onSelect: (value: any) => void;
}

const SearchInput: React.FC<ISearchInputProps> = React.forwardRef(
  ({ children, recommendations, onSelect, ...props }, ref) => {
    const [input, setInput] = useState("");

    useEffect(() => {
      onSelect(input);
    }, [input]);

    return (
      // {/* input */}
      <div className="flex border border-gray-500 w-full bg-white">
        <Autocomplete
          ref={ref}
          value={input}
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
      </div>
    );
  }
);
