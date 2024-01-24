import { IoIosClose } from "react-icons/io";
import {
  FaHeart,
  FaUser,
  FaCalendar,
  FaBuilding,
  FaUsers,
} from "react-icons/fa";

function FavoriteEventShow({ event, onClickClose, onClickHeart }) {
  const modalClass =
    "fixed inset-0 flex flex-col items-center justify-center w-screen h-screen bg-blue bg-auto z-10";
  const containerClass =
    "border border-gray-300 bg-white rounded-lg overflow-hidden";
  const imageContainerClass = "relative overflow-hidden";
  const image = "max-w-lg max-h-lg w-full h-auto rounded-t-lg";
  const close =
    "text-4xl absolute top-2 right-2 cursor-pointer bg-white p-1 rounded-full";
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
  };

  const handleClickHeart = function () {
    onClickHeart();
    onClickClose();
  };

  return (
    <div className={modalClass}>
      <div className={containerClass}>
        <div className={imageContainerClass}>
          <img
            className={image}
            key={event.id}
            src={event.image}
            alt={event.name}
          />
          <IoIosClose className={close} onClick={handleClickClose} />
          <div className={`${favoriteContainerClass} ${heartCircleClass}`}>
            <FaHeart className={`${favoriteClass} text-red-500`} onClick={handleClickHeart} />
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
