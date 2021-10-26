import { makeAutoObservable } from "mobx";

interface ISelectModalState {
  visible: boolean;
  shouldVisible: boolean;
}
interface IModalTypes {
  selectModal: ISelectModalState;
}

export default class UiState {
  constructor() {
    makeAutoObservable(this);
  }

  modal: IModalTypes = {
    selectModal: {
      visible: false,
      shouldVisible: false,
    },
  };

  setSelectModal(param: Partial<ISelectModalState>) {
    this.modal.selectModal = {
      ...this.modal.selectModal,
      ...param,
    };
  }
}
