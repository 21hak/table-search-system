import React, { HTMLProps, useEffect } from "react";
import Portal from "../../../utils/portal";

interface IModalProps extends HTMLProps<HTMLDivElement> {
  onClose: (e: any) => void;
  maskClosable: boolean;
  closable: boolean;
  visible: boolean;
}

export const Modal: React.FC<IModalProps> = function Modal({
  children,
  onClose,
  maskClosable,
  closable,
  visible,
  ...props
}) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  return (
    <Portal>
      <div
        className={
          "fixed top-0 left-0 bottom-0 right-0 z-40 bg-opacity-30 bg-black " +
          (visible ? "" : "hidden")
        }>
        <div
          onClick={(e) => (maskClosable ? onMaskClick(e) : null)}
          className={
            "fixed top-0 left-0 bottom-0 right-0 overflow-auto outline-none z-50 w-full " +
            (visible ? "" : "hidden")
          }
          tabIndex={-1}>
          <div
            className="relative bg-white border-0 top-2/4 transform -translate-y-1/2 m-auto mt-0 mb-0 w-1/2"
            tabIndex={0}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
