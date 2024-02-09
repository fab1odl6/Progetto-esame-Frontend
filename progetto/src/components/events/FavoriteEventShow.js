import { IoIosClose } from "react-icons/io";
import {
  FaHeart,
  FaUser,
  FaCalendar,
  FaBuilding,
  FaUsers,
} from "react-icons/fa";
import { Dialog, DialogContent } from "@mui/material";

function FavoriteEventShow({ event, onClickHeart, open, onClose }) {
  const modalClass ="fixed inset-0 flex flex-col items-center justify-center w-screen h-screen bg-blue bg-auto z-10";
  const containerClass ="border border-gray-300 bg-white rounded-lg overflow-hidden";
  const imageContainerClass = "relative overflow-hidden";
  const image = "max-w-lg max-h-lg w-full h-auto rounded-t-lg";
  const close ="text-4xl absolute top-2 right-2 cursor-pointer bg-white p-1 rounded-full";
  const contentClass = "p-4 mt-2 mb-2 relative flex flex-col items-center";
  const favoriteContainerClass = "absolute bottom-1 right-2";
  const favoriteClass = "text-2xl cursor-pointer text-red-500";
  const heartCircleClass = "rounded-full p-1 bg-gray-200";
  const dataContainerClass = "flex items-center mb-2 w-full";
  const dataIconClass = "mr-2 text-blue-700";
  const dataTextClass = "font-bold";
  const labelTextClass = "text-gray-500";

  return (
    <div className={modalClass}>
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <div className={containerClass}>
            <div className={imageContainerClass}>
              <img
                className={image}
                key={event.id}
                src={event.image}
                alt={event.name}
              />
              <IoIosClose className={close} onClick={onClose} />
              <div className={`${favoriteContainerClass} ${heartCircleClass}`}>
                <FaHeart className={favoriteClass} onClick={onClickHeart} />
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
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default FavoriteEventShow;
