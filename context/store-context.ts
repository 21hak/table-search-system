import React from "react";
import UiState from "store/uistate";

interface IStoreContext {
  uiState: UiState;
}
const StoreContext = React.createContext<IStoreContext>({} as IStoreContext);
export default StoreContext;
