import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftEvent, swipeRightEvent, updateEvent } from "../../store";
import EventShow from "./EventShow";
import { useState, useEffect, useContext } from 'react';
import NavigationContext from '../../context/navigation';
import { IoIosClose } from 'react-icons/io';
import LoginModals from '../modals/loginModals';


function EventSlideShow() {

    const containerClass = "overflow: auto z-50";
    const modalContainerClass = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    const modalDivClass = "bg-white p-8 max-w-md rounded shadow-lg relative";
    const textContainerClass = "mb-4";
    const buttonClass = "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer";
    const closeButtonClass = "absolute top-2 right-2 text-gray-700 cursor-pointer text-lg";

    const eventTextClass = "";
    const eventDivClass = "relative w-full";
    const eventContainerClass = "flex justify-center mx-auto flex-row place-content-center border-2 mb-2 rounded-lg overflow-hidden z-50 max-w-sm p-6 bg-yellow-100 border-yellow-200 rounded-lg shadow hover:bg-yellow-800 dark:bg-yellow-800 dark:border-yellow-700 dark:hover:bg-yellow-700";
    const chevronContainerClass = "flex items-center justify-center";
    const eventElementClass = "";
    const imageClass = "w-full h-full cursor-pointer object-cover";
    const chevronClass = "place-self-center text-2xl";
    const titleAndHeartClass = "flex mt-2";
    const favoriteClass = "ml-auto text-2xl";
    const titleClass = "text-lg place-content-center cursor-pointer";


    const { navigate } = useContext(NavigationContext);

    const { array, index } = useSelector((state) => {
        return state.events;
    });

    const { logged, events } = useSelector((state) => {
        return state.users;
    })
    const [favoriteState, setFavoriteState] = useState(false);
    const [modal, setModal] = useState(false);
    const [full, setFull] = useState(false);

    const dispatch = useDispatch();

    const handleClickChevronLeft = function () {
        dispatch(swipeLeftEvent());
    }

    const handleClickChevronRight = function () {
        dispatch(swipeRightEvent());
    }

    const handleClickHeart = function (event) {
        console.log("Logged: " + logged)
        if (logged) {
            dispatch(updateEvent(event));
            setFavoriteState(!favoriteState);
        } else {
            setModal(true);
        }
    }

    const handleClickEvent = function () {
        setFull(!full);
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

    const openModal = function () {
        setFull(true);
    }

    const closeModal = function () {
        setFull(false)
    }

    const altText = "Image of " + array[index].name;

    return (
        <div className={containerClass}>
            {modal && (
                <LoginModals onClickButton={handleClickButton} onCloseLog={handleClickCloseLog} />
            )}
            <div className={eventTextClass}>Highlighted Events</div>
            <div className={eventDivClass}>
                <div className={eventContainerClass}>
                    <div className={chevronContainerClass}>
                        <FaChevronLeft className={chevronClass + " mr-2 cursor-pointer"} onClick={handleClickChevronLeft} />
                    </div>
                    <div className={eventElementClass}>
                        <div onClick={handleClickEvent}>
                            <img className={imageClass} src={array[index].image} alt={altText} />
                        </div>
                        <div className={titleAndHeartClass}>
                            <div className={titleClass} onClick={handleClickEvent}>{array[index].name}</div>
                            {favoriteState ? (
                                <FaHeart className={favoriteClass} onClick={() => handleClickHeart(array[index])} />
                            ) : (
                                <FaRegHeart className={favoriteClass} onClick={() => handleClickHeart(array[index])} />
                            )}
                        </div>
                    </div>
                    <div className={chevronContainerClass}>
                        <FaChevronRight className={chevronClass + " ml-2 cursor-pointer"} onClick={handleClickChevronRight} />
                    </div>
                </div>
                {full &&
                    <EventShow
                        favoriteState={favoriteState}
                        onClickHeart={handleClickHeart}
                        setFavoriteState={setFavoriteState}
                        open={openModal}
                        onClose={closeModal}
                    />
                }
            </div>
        </div>
    );
}

export default EventSlideShow;
