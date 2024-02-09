import { IoIosClose } from "react-icons/io";
import { Dialog, DialogContent } from "@mui/material";

function LoginModals({ onClickButton, onCloseLog, open }) {
  const modalContainerClass ="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1000";
  const modalDivClass ="bg-white p-8 max-w-md rounded shadow-lg relative fixed";
  const textContainerClass = "mb-4";
  const buttonClass = "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer";
  const closeButtonClass ="absolute top-2 right-2 text-gray-700 cursor-pointer text-lg";

  return (
    <Dialog open={open} onClose={onCloseLog}>
      <DialogContent>
        <div className={modalContainerClass}>
          <div className={modalDivClass}>
            <div className={textContainerClass}>
              You must login to save an artwork/event!
            </div>
            <button onClick={onClickButton} className={buttonClass}>
              Login
            </button>
            <IoIosClose onClick={onCloseLog} className={closeButtonClass} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default LoginModals;
