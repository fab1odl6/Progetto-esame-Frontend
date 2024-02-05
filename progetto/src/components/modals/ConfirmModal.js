import { Dialog, DialogContent } from "@mui/material";

function ConfirmModal({ open, onClose, onDelete, onUndo, message }) {
  const modalContainerClass =
    "fixed inset-0 z-50 overflow-auto flex items-center justify-center";
  const modalDivClass =
    "relative p-4 bg-white rounded-lg shadow dark:bg-gray-700";
  const closeButtonClass =
    "absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white";
  const textContainerClass = "p-4 md:p-5 text-center";
  const iconContainerClass =
    "mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200";
  const textClass = "mb-5 text-lg font-normal text-gray-500 dark:text-gray-400";
  const confrimButtonClass =
    "text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2";
  const cancelButtonClass =
    "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <div id="popup-modal" className={modalContainerClass}>
          <div className={modalDivClass}>
            <button
              onClick={onUndo}
              type="button"
              className={closeButtonClass}
              data-modal-hide="popup-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className={textContainerClass}>
              <svg
                className={iconContainerClass}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className={textClass}>{message}</h3>
              <button
                data-modal-hide="popup-modal"
                type="button"
                onClick={onDelete}
                className={confrimButtonClass}
              >
                Yes, I'm sure
              </button>
              <button
                onClick={onUndo}
                data-modal-hide="popup-modal"
                type="button"
                className={cancelButtonClass}
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmModal;
