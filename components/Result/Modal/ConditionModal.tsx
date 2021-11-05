import ModalContext from "context/modal-context";
import QueryContext from "context/query-context";
import React, { HTMLProps, useContext, useEffect, useState } from "react";

import { Modal } from "./Modal";
import Autocomplete from "react-autocomplete";
import { matchColumn } from "utils";
import ResultContext from "context/result-context";

interface IConditionModalProps {}
const signRecommendations = ["=", ">=", "<="];
export const ConditionModal: React.FC<IConditionModalProps> = (props) => {
  const { conditionModal } = useContext(ModalContext);
  const { recommendations } = useContext(ResultContext);
  const { query, postSQL } = useContext(QueryContext);
  const [column, setColumn] = useState<string>("");
  const [sign, setSign] = useState<"=" | "<=" | ">=" | "">("");
  const [value, setValue] = useState<any>();

  const onSubmit = () => {
    if (sign) {
      const c = query.where.concat([
        { left: column, sign: sign, right: value },
      ]);
      setColumn("");
      setSign("");
      setValue("");
      postSQL({ ...query, where: c });
      conditionModal.setVisible(false);
    }
  };

  return (
    <Modal
      onClose={() => {
        conditionModal.setVisible(false);
      }}
      maskClosable={true}
      closable={true}
      visible={conditionModal.visible}>
      <div className="p-4 shadow">
        <div className="pb-1">
          <SearchInput
            className="pb-1"
            placeholder="column"
            recommendations={recommendations}
            value={column}
            onChange={(value) => setColumn(value)}
          />
        </div>
        <div className="pb-1">
          <SearchInput
            className="pb-1"
            placeholder="sign"
            recommendations={signRecommendations}
            value={sign}
            onChange={(value) => setSign(value)}
          />
        </div>
        <SearchInput
          placeholder="value"
          recommendations={[]}
          value={value}
          onChange={(value) => setValue(value)}
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
              conditionModal.setVisible(false);
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
