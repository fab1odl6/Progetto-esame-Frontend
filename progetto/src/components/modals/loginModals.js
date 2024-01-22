import { IoIosClose } from 'react-icons/io';

function LoginModals({onClickButton, onCloseLog}) {

    const modalContainerClass = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    const modalDivClass = "bg-white p-8 max-w-md rounded shadow-lg relative";
    const textContainerClass = "mb-4";
    const buttonClass = "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer";
    const closeButtonClass = "absolute top-2 right-2 text-gray-700 cursor-pointer text-lg";

    return (
        <div className={modalContainerClass}>
            <div className={modalDivClass}>
                <div className={textContainerClass}>You must login to save an artwork/event!</div>
                    <button onClick={onClickButton} className={buttonClass}>
                        Login
                    </button>
                <IoIosClose onClick={onCloseLog} className={closeButtonClass} />
            </div>
        </div>
    )
}

export default LoginModals;