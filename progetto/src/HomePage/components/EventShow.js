import { useDispatch, useSelector } from "react-redux";
import { switchFullEvent } from "../store";
import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import className from "classnames";
import { useEffect } from "react";


function EventShow({ favoriteState, onClickHeart, setFavoriteState }) {

    const modal = className("fixed inset-0 flex flex-col items-center justify-center w-screen h-screen bg-blue bg-auto z-10");
    const container = className("border-slate-300 border-solid border-4 bg-white");
    const imageContainer = className("flex justify-between relative");
    const image = className("max-w-lg max-h-lg");
    const close = className("text-3xl absolute border-1 border-black top-2.5 right-2.5 bg-white place-self-center");
    const firstRow = className("flex justify-between");
    const favorite = className("ml-auto text-2xl");

    const { array, index } = useSelector((state) => {
        return state.events;
    })

    const { events, logged } = useSelector((state) => {
        return state.users;
    })

    const dispatch = useDispatch();

    const handleClickClose = function () {
        dispatch(switchFullEvent());
    }

    const handleClickHeart = function (event) {
        onClickHeart(event);
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

    return (
        <div className={modal}>
            <div className={container}>
                <div className={imageContainer}>
                    <img className={image} key={array[index].id} src={array[index].image} alt={array[index].name} />
                    <IoIosClose className={close} onClick={handleClickClose} />
                </div>
                <div className={firstRow}>
                    {array[index].name && <div>Title: {array[index].name}</div>}
                    {favoriteState ? (
                        <FaHeart className={favorite} onClick={() => handleClickHeart(array[index])} />
                    ) : (
                        <FaRegHeart className={favorite} onClick={() => handleClickHeart(array[index])} />
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
