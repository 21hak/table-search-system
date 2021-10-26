import React from "react";

interface IModalContext {
  [modal: string]: { visible: boolean; setVisible: (visible: boolean) => void };
}
const ModalContext = React.createContext<IModalContext>({} as IModalContext);
export default ModalContext;
