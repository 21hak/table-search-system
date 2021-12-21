import React from "react";

interface IModalContext {
  [modal: string]: { visible: boolean; setVisible: (visible: boolean) => void };
}
/**
 * Context for Modal Visibility
 */
const ModalContext = React.createContext<IModalContext>({} as IModalContext);
export default ModalContext;
