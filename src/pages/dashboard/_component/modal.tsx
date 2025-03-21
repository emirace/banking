import { PropsWithChildren } from "react";
import { IoClose } from "react-icons/io5";
interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-xl w-full  shadow-lg relative">
        <button
          className="absolute top-3 right-3 text-gray-600"
          onClick={onClose}
        >
          <IoClose size={24} />
        </button>
        <div className="h-full w-full ">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
