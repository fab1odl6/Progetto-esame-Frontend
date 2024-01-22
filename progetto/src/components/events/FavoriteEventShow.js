/* import { IoIosClose } from "react-icons/io";
import { FaHeart } from 'react-icons/fa';


function FavoriteEventShow({ event, onClickClose, onClickHeart }) {

    const modal = "fixed inset-0 flex flex-col items-center justify-center w-screen h-screen bg-blue bg-auto z-10";
    const container = "border-slate-300 border-solid border-4 bg-white";
    const imageContainer = "flex justify-between relative";
    const image = "max-w-lg max-h-lg";
    const close = "text-3xl absolute border-1 border-black top-2.5 right-2.5 bg-white place-self-center";
    const firstRow = "flex justify-between";
    const favoriteClass = "ml-auto text-2xl";


    const handleClickClose = function () {
        onClickClose();
    }

    const handleClickHeart = function () {
        onClickHeart();
        onClickClose();
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


/* 
import { IoIosClose } from "react-icons/io";
import { FaHeart } from 'react-icons/fa';

// ... Altre importazioni

function FavoriteEventShow({ event, onClickClose, onClickHeart }) {
    const modalClass = "fixed inset-0 flex items-center justify-center bg-blue bg-opacity-90 z-10";
    const containerClass = "border-4 border-slate-300 bg-white max-w-md rounded-lg overflow-hidden flex flex-col";  // Modifica la classe container
    const imageContainerClass = "relative";
    const imageClass = "w-full h-auto rounded-t-lg";
    const closeClass = "text-3xl absolute top-2.5 right-2.5 cursor-pointer bg-gray-200 p-2 rounded-full";
    const contentClass = "p-4 flex-grow";  // Modifica la classe content
    const priceClass = "text-sm text-gray-500";
    const addressClass = "font-medium";
    const infoClass = "mt-6 flex items-center gap-8 text-xs justify-between";  // Modifica la classe info
    const categoryClass = "sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2 ml-auto";  // Aggiungi la classe ml-auto al cuore
    const iconClass = "h-4 w-4 text-indigo-700";
    const detailsClass = "mt-1.5 sm:mt-0";

    const handleClickClose = () => {
        onClickClose();
    }

    const handleClickHeart = () => {
        onClickHeart();
        onClickClose();
    }

    console.log('Event data:', event); // Aggiunto per debugging

    return (
        <div className={modalClass}>
            <div className={containerClass}>
                <div className={imageContainerClass}>
                    <img className={imageClass} src={event.image} alt={event.title} />
                    <IoIosClose className={closeClass} onClick={handleClickClose} />
                </div>
                <div className={contentClass}>
                    <dl>
                        <div>
                            <dt className="sr-only">Title</dt>
                            <dd className={priceClass}>Title: {event.title}</dd>
                        </div>
                        <div>
                            <dt className="sr-only">Author</dt>
                            <dd className={addressClass}>Author: {event.author}</dd>
                        </div>
                        <div>
                            <dt className="sr-only">Year</dt>
                            <dd className={addressClass}>Year: {event.year}</dd>
                        </div>
                    </dl>
                </div>
                <div className={infoClass}>
                    <div className={categoryClass}>
                        <div className={detailsClass}>
                            <FaHeart className={iconClass} onClick={handleClickHeart} />
                            <p className="text-gray-500">Likes</p>
                            <p className="font-medium">{event.likes}</p>
                        </div>
                    </div>
                    <div className={categoryClass}>
                        <svg className={iconClass} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                    {/* Aggiungi ulteriori dettagli a seconda delle tue esigenze }
                </div>
            </div>
        </div>
    );
}

export default FavoriteEventShow;

*/

import { IoIosClose } from "react-icons/io";
import { FaHeart, FaUser, FaCalendar, FaBuilding, FaUsers } from 'react-icons/fa';

function FavoriteEventShow({ event, onClickClose, onClickHeart }) {
    const modalClass = "fixed inset-0 flex flex-col items-center justify-center w-screen h-screen bg-blue bg-auto z-10";
    const containerClass = "border border-gray-300 bg-white rounded-lg overflow-hidden";
    const imageContainerClass = "relative overflow-hidden";
    const image = "max-w-lg max-h-lg w-full h-auto rounded-t-lg";
    const close = "text-4xl absolute top-2 right-2 cursor-pointer bg-white p-1 rounded-full";
    const contentClass = "p-4 mt-2 mb-2 relative flex flex-col items-center"; // Aggiunti margini superiore e inferiore
    // const firstRow = "flex justify-between items-center w-full"; // Aggiunto w-full
    const favoriteContainerClass = "absolute bottom-1 right-2";
    const favoriteClass = "text-2xl cursor-pointer";
    const heartCircleClass = "rounded-full p-1 bg-gray-200";
    const dataContainerClass = "flex items-center mb-2 w-full"; // Aggiunto margine inferiore
    const dataIconClass = "mr-2 text-blue-700"; // Modificato per spostare l'icona a destra
    const dataTextClass = "font-bold"; // Nuova classe per il testo
    const labelTextClass = "text-gray-500"; // Nuova classe per il testo dell'etichetta

    const handleClickClose = function () {
        onClickClose();
    }

    const handleClickHeart = function () {
        onClickHeart();
        onClickClose();
    }

    return (
        <div className={modalClass}>
            <div className={containerClass}>
                <div className={imageContainerClass}>
                    <img className={image} key={event.id} src={event.image} alt={event.name} />
                    <IoIosClose className={close} onClick={handleClickClose} />
                    <div className={`${favoriteContainerClass} ${heartCircleClass}`}>
                        <FaHeart className={favoriteClass} onClick={handleClickHeart} />
                    </div>
                </div>
                <div className={contentClass}>
                    {event.name && (
                        <div className={dataContainerClass}>
                            <FaUser className={dataIconClass} />
                            <span className={labelTextClass}>Title:&nbsp;</span>
                            <span className={dataTextClass}>{event.name}</span>
                        </div>
                    )}
                    {event.department && (
                        <div className={dataContainerClass}>
                            <FaBuilding className={dataIconClass} />
                            <span className={labelTextClass}>Department:&nbsp;</span>
                            <span className={dataTextClass}>{event.department}</span>
                        </div>
                    )}
                    {event.guests && (
                        <div className={dataContainerClass}>
                            <FaUsers className={dataIconClass} />
                            <span className={labelTextClass}>Guests:&nbsp;</span>
                            <span className={dataTextClass}>{event.guests}</span>
                        </div>
                    )}
                    {event.date && (
                        <div className={dataContainerClass}>
                            <FaCalendar className={dataIconClass} />
                            <span className={labelTextClass}>Date:&nbsp;</span>
                            <span className={dataTextClass}>{event.date}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FavoriteEventShow;
