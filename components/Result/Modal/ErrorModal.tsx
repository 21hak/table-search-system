import ModalContext from "context/modal-context";
import QueryContext from "context/query-context";
import React, { HTMLProps, useContext, useEffect, useState } from "react";

import { Modal } from "./Modal";
import Autocomplete from "react-autocomplete";
import { matchColumn } from "utils";
import ResultContext from "context/result-context";

interface IErrorModalProps {}

export const ErrorModal: React.FC<IErrorModalProps> = (props) => {
  const { errorModal } = useContext(ModalContext);
  return (
    <Modal
      onClose={() => {
        errorModal.setVisible(false);
      }}
      maskClosable={true}
      closable={true}
      visible={errorModal.visible}>
      <div className="p-2 shadow">
        {/* buttons */}
        <div className="">Invalid Query!!</div>
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            className="border border-gray-900 p-1 flex-grow"
            onClick={(e) => {
              errorModal.setVisible(false);
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
  onChange: (value: any) => void;
}

const SearchInput: React.FC<ISearchInputProps> = React.forwardRef(
  ({ children, recommendations, onChange: onSelect, ...props }, ref) => {
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
