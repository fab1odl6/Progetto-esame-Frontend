import { useDispatch, useSelector } from "react-redux";
import { switchFullEvent } from "../../store";
import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useContext, useEffect, useState } from "react";
import NavigationContext from "../../context/navigation";


function EventShow({ favoriteState, onClickHeart, setFavoriteState }) {

    const modalClass = "fixed inset-0 flex flex-col items-center justify-center w-screen h-screen bg-blue bg-auto z-10";
    const modalContainerClass = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    const modalDivClass = "bg-white p-8 max-w-md rounded shadow-lg relative";
    const textContainerClass = "mb-4";
    const buttonClass = "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer";
    const closeButtonClass = "absolute top-2 right-2 text-gray-700 cursor-pointer text-lg";
    const containerClass = "border-slate-300 border-solid border-4 bg-white";
    const imageContainerClass = "flex justify-between relative";
    const imageClass = "max-w-lg max-h-lg";
    const closeIconClass = "text-3xl absolute border-1 border-black top-2.5 right-2.5 bg-white place-self-center";
    const firstRowClass = "flex justify-between";
    const favoriteClass = "ml-auto text-2xl";


    const { navigate } = useContext(NavigationContext);

    const { array, index } = useSelector((state) => {
        return state.events;
    })

    const { events, logged } = useSelector((state) => {
        return state.users;
    })
    const [modal, setModal] = useState(false);

    const dispatch = useDispatch();

    const handleClickClose = function () {
        dispatch(switchFullEvent());
    }

    const handleClickHeart = function (event) {
        if (logged) {
            onClickHeart(event);
        } else {
            setModal(true);
        }
    }

    useEffect(() => {
        if (logged) {
            if (events.find((item) => item.name === array[index].name)) {
                setFavoriteState(true);
            } else {
                setFavoriteState(false);
            }
        }
    }, [index, logged]);

    const handleClickButton = function () {
        navigate("/login");
    }

    const handleClickCloseLog = function () {
        setModal(false);
    }


    return (
        <div className={modalClass}>
            {modal && (
                <div className={modalContainerClass}>
                    <div className={modalDivClass}>
                        <div className={textContainerClass}>You must login to save an artwork/event!</div>
                        <button onClick={handleClickButton} className={buttonClass}>
                            Login
                        </button>
                        <IoIosClose onClick={handleClickCloseLog} className={closeButtonClass} />
                    </div>
                </div>
            )}
            <div className={containerClass}>
                <div className={imageContainerClass}>
                    <img className={imageClass} key={array[index].id} src={array[index].image} alt={array[index].name} />
                    <IoIosClose className={closeIconClass} onClick={handleClickClose} />
                </div>
                <div className={firstRowClass}>
                    {array[index].name && <div>Title: {array[index].name}</div>}
                    {favoriteState ? (
                        <FaHeart className={favoriteClass} onClick={() => handleClickHeart(array[index])} />
                    ) : (
                        <FaRegHeart className={favoriteClass} onClick={() => handleClickHeart(array[index])} />
                    )}
                </div>
                {array[index].department && <div>Department: {array[index].department}</div>}
                {array[index].guests && <div>Guests: {array[index].guests}</div>}
                {array[index].date && <div>Date: {array[index].date}</div>}
            </div>
        </div>
    )
}

export default EventShow;
