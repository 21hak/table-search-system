import ModalContext from "context/modal-context";
import StoreContext from "context/store-context";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import QueryContext, { ISelect, IWhere } from "../../../context/query-context";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import closePath from "@/public/close.png";
import { ErrorModal } from "../Modal/ErrorModal";

interface IResultInterfaceProps {}
const ResultInterface: React.FC<IResultInterfaceProps> = ({
  children,
  ...props
}) => {
  const router = useRouter();
  const onClear = () => {
    router.push({ pathname: "/" });
  };
  const { query, postSQL } = useContext(QueryContext);
  const { selectModal, groupbyModal, conditionModal } =
    useContext(ModalContext);

  const onRemoveGroupby = (index: number) => {
    const pos = query.select.findIndex(
      (s) => s.column === query.groupby[index]
    );

    postSQL({
      ...query,
      ...(pos > -1 && {
        select: [...query.select.slice(0, pos), ...query.select.slice(pos + 1)],
      }),
      groupby: [
        ...query.groupby.slice(0, index),
        ...query.groupby.slice(index + 1),
      ],
    });
  };

  const onRemoveSelect = (index: number) => {
    const pos = query.groupby.findIndex(
      (g) =>
        g === query.select[index].column && query.select[index].agg === "NONE"
    );

    postSQL({
      ...query,
      select: [
        ...query.select.slice(0, index),
        ...query.select.slice(index + 1),
      ],
      ...(pos > -1 && {
        groupby: [
          ...query.groupby.slice(0, pos),
          ...query.groupby.slice(pos + 1),
        ],
      }),
    });
  };
  const onRemoveCondition = (index: number) => {
    postSQL({
      ...query,
      where: [...query.where.slice(0, index), ...query.where.slice(index + 1)],
    });
  };

  const onAddSelect = () => {
    selectModal.setVisible(true);
  };
  const onAddGroupby = () => {
    groupbyModal.setVisible(true);
  };
  const onAddConditon = () => {
    conditionModal.setVisible(true);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd =
    ({ items, setState }) =>
    async (result) => {
      if (!result.destination) {
        return;
      }

      const newItems: any = reorder(
        items,
        result.source.index,
        result.destination.index
      );
      await setState(newItems);
    };

  return (
    <>
      {/* result */}
      <div className="flex flex-col mb-2">
        <Buttons items={query.from} name="Tables" />
        <Buttons
          items={query.select.map(
            (s) => `${s.column} ${s.agg !== "NONE" ? `(${s.agg})` : ""}`
          )}
          name="Outputs"
          onAdd={onAddSelect}
          onRemove={onRemoveSelect}
          onDragEnd={onDragEnd({
            items: query.select,
            setState: async (items) => {
              postSQL({ ...query, select: items });
            },
          })}
        />
        <Buttons
          items={query.where.map((w) => `${w.left} ${w.operator} ${w.right}`)}
          name="Conditions"
          onRemove={onRemoveCondition}
          onAdd={onAddConditon}
          onDragEnd={onDragEnd({
            items: query.where,
            setState: async (items) => {
              postSQL({ ...query, where: items });
            },
          })}
        />
        <Buttons
          items={query.groupby}
          name="Groupby"
          onAdd={onAddGroupby}
          onRemove={onRemoveGroupby}
          onDragEnd={onDragEnd({
            items: query.groupby,
            setState: async (items) => {
              postSQL({ ...query, groupby: items });
            },
          })}
        />
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

interface IButtonsProps {
  name: string;
  items: Array<string>;
  onDragEnd?: (result: any) => void;
  onRemove?: (index: number) => void;
  onAdd?: () => void;
}
const Buttons: React.FC<IButtonsProps> = (props) => {
  const [removable, setRemovable] = useState<number | null>(null);
  const onHoverButton = (index) => {
    props.onRemove && setRemovable(index);
  };

  return (
    <div className="flex items-start">
      <span className="font-normal w-28 block">{props.name}</span>
      <DragDropContext onDragEnd={props.onDragEnd ? props.onDragEnd : () => {}}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              className="flex flex-wrap items-center"
              ref={provided.innerRef}
              // style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}>
              {props.items.map((item, index) => (
                <div
                  key={item}
                  className={
                    "mb-1 mr-1 " + (index === removable ? "-mr-6" : "")
                  }>
                  <Draggable draggableId={item} index={index}>
                    {(provided, snapshot) => (
                      <div
                        onMouseEnter={() => onHoverButton(index)}
                        onMouseLeave={() => setRemovable(null)}
                        className={
                          "relative bg-white " +
                          (index === removable
                            ? "z-10 border border-gray-400"
                            : "")
                        }>
                        <div
                          className={
                            "bg-white inline-block p-1 cursor-pointer select-none " +
                            (index === removable
                              ? "-mr-1"
                              : "border border-gray-400")
                          }
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}>
                          {item}
                        </div>
                        <span
                          className={
                            "w-8 text-center hover:bg-gray-300 cursor-pointer " +
                            (index === removable ? "inline-block" : "hidden")
                          }
                          onClick={() => {
                            props.onRemove(index);
                          }}>
                          x
                        </span>
                        {/* <button
                          type="button"
                          className={
                            "bg-16 bg-close bg-no-repeat bg-center bg-cover w-8 h-4 " +
                            (visible && index == 1 ? "inline-block" : "hidden")
                          }></button> */}
                      </div>
                    )}
                  </Draggable>
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {!!props.onAdd && (
        <span
          className="bg-white border border-gray-400 inline-block p-1 pr-3 pl-3 mr-1 mb-1 cursor-pointer"
          onClick={props.onAdd}>
          +
        </span>
      )}
    </div>
    // <div className="flex items-start">
    //   <span className="font-normal w-28 block">{props.name}</span>
    //   <div className="flex flex-wrap items-center">
    //     {props.items.map((item, index) => (
    //       <span
    //         onClick={props.onRemove}
    //         key={item}
    //         className="bg-white border border-gray-400 inline-block p-1 mr-1 mb-1 cursor-pointer">
    //         {item}
    //       </span>
    //     ))}
    //     {!!props.onAdd && (
    //       <span
    //         className="bg-white border border-gray-400 inline-block p-1 pr-3 pl-3 mr-1 mb-1 cursor-pointer"
    //         onClick={props.onAdd}>
    //         +
    //       </span>
    //     )}
    //   </div>
    // </div>
  );
};

export default ResultInterface;
