import ModalContext from "context/modal-context";
import React, { useContext } from "react";

import { Modal } from "./Modal";

interface IErrorModalProps {}

/**
 * 서버에서 쿼리 실행시 에러가 발생하면 노출되는 모달
 */
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
