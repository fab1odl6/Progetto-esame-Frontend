import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import className from "classnames";
import { useState } from "react";


function FavoriteEventShow({ event, onClickClose, onClickHeart }) {
    const modal = className("fixed inset-0 flex flex-col items-center justify-center w-screen h-screen bg-blue bg-auto z-10");
    const container = className("border-slate-300 border-solid border-4 bg-white");
    const imageContainer = className("flex justify-between relative");
    const image = className("max-w-lg max-h-lg");
    const close = className("text-3xl absolute border-1 border-black top-2.5 right-2.5 bg-white place-self-center");
    const firstRow = className("flex justify-between");
    const favoriteClass = className("ml-auto text-2xl");


    const [favorite, setFavorite] = useState(true);

    const handleClickClose = function () {
        onClickClose();
    }

    const handleClickHeart = function () {
        onClickHeart();
        setFavorite(!favorite);
    }

    return (
        <div className={modal}>
            <div className={container}>
                <div className={imageContainer}>
                    <img className={image} key={event.id} src={event.image} alt={event.name} />
                    <IoIosClose className={close} onClick={handleClickClose} />
                </div>
                <div className={firstRow}>
                    {event.name && <div>Title: {event.name}</div>}
                    {favorite ? (
                        <FaHeart className={favoriteClass} onClick={handleClickHeart} />
                    ) : (
                        <FaRegHeart className={favoriteClass} onClick={handleClickHeart} />
                    )}
                </div>
                {event.department && <div>Department: {event.department}</div>}
                {event.guests && <div>Guests: {event.guests}</div>}
                {event.date && <div>Date: {event.date}</div>}
            </div>
        </div>
    )
}

export default FavoriteEventShow;
