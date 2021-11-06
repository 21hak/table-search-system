import ModalContext from "context/modal-context";
import QueryContext from "context/query-context";
import React, {
  HTMLProps,
  useContext,
  useRef,
  useState,
  useEffect,
} from "react";

import { Modal } from "./Modal";
import Autocomplete from "react-autocomplete";
import { matchColumn } from "utils";
import ResultContext from "context/result-context";

interface IGroupbyModalProps {}

export const GroupbyModal: React.FC<IGroupbyModalProps> = (props) => {
  const groupbyModalRef = useRef(null);
  const { groupbyModal } = useContext(ModalContext);
  const { query, postSQL } = useContext(QueryContext);
  const [groupby, setGroupby] = useState<string>("");
  const { recommendations } = useContext(ResultContext);
  useEffect(() => {
    if (groupbyModal.visible && groupbyModalRef.current) {
      groupbyModalRef.current.focus();
    }
  }, [groupbyModal.visible]);

  const onSubmit = () => {
    const g = query.groupby.concat([groupby]);
    const s = query.select.concat([{ column: groupby, agg: "NONE" }]);
    s.forEach((select) => {
      if (select.agg === "NONE" && !g.includes(select.column)) {
        select.agg = "SUM";
      }
    });
    setGroupby("");
    postSQL({ ...query, select: s, groupby: g });
    groupbyModal.setVisible(false);
  };

  const onClose = () => {
    setGroupby("");
    groupbyModal.setVisible(false);
  };

  return (
    <Modal
      onClose={onClose}
      maskClosable={true}
      closable={true}
      visible={groupbyModal.visible}>
      <div className="p-4 shadow">
        <div className="pb-1">
          <SearchInput
            ref={groupbyModalRef}
            className="pb-1"
            placeholder="groupby"
            recommendations={recommendations}
            value={groupby}
            onChange={(value) => setGroupby(value)}
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
            onClick={onClose}>
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
  value: string;
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
