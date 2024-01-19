import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from "react";


function FavoriteEventShow({ event, onClickClose, onClickHeart }) {

    const modal = "fixed inset-0 flex flex-col items-center justify-center w-screen h-screen bg-blue bg-auto z-10";
    const container = "border-slate-300 border-solid border-4 bg-white";
    const imageContainer = "flex justify-between relative";
    const image = "max-w-lg max-h-lg";
    const close = "text-3xl absolute border-1 border-black top-2.5 right-2.5 bg-white place-self-center";
    const firstRow = "flex justify-between";
    const favoriteClass = "ml-auto text-2xl";


    //const [favorite, setFavorite] = useState(true);

    const handleClickClose = function () {
        onClickClose();
    }

    const handleClickHeart = function () {
        onClickHeart();
        onClickClose();
        //setFavorite(!favorite);
    }

    /*
    {favorite ? (
        <FaHeart className={favoriteClass} onClick={handleClickHeart} />
    ) : (
        <FaRegHeart className={favoriteClass} onClick={handleClickHeart} />
    )}
    */

    return (
        <div className={modal}>
            <div className={container}>
                <div className={imageContainer}>
                    <img className={image} key={event.id} src={event.image} alt={event.name} />
                    <IoIosClose className={close} onClick={handleClickClose} />
                </div>
                <div className={firstRow}>
                    {event.name && <div>Title: {event.name}</div>}
                    <FaHeart className={favoriteClass} onClick={handleClickHeart} />
                </div>
                {event.department && <div>Department: {event.department}</div>}
                {event.guests && <div>Guests: {event.guests}</div>}
                {event.date && <div>Date: {event.date}</div>}
            </div>
        </div>
    )
}

export default FavoriteEventShow;
