import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import FavoriteEventShow from "./FavoriteEventShow";
import { useDispatch } from "react-redux";
import { updateEvent } from "../../store";
import ConfirmModal from "../modals/ConfirmModal";

function EventCard({ event }) {
  const containerClass =
    "border-2 mb-2 rounded-lg overflow-hidden z-50 max-w-sm p-6 bg-white-100 border-yellow-200 rounded-lg shadow hover:bg-yellow-800 dark:bg-yellow-800 dark:border-yellow-700 dark:hover:bg-yellow-700";
  const favoriteClass = "ml-auto text-2xl cursor-pointer";
  const imageClass = "w-full h-96 object-cover cursor-pointer";
  const titleAndHeartClass = "flex p-4";
  const errorMessageClass = "bg-red-500 text-white p-4 text-center";

  const dispatch = useDispatch();
  const [fullState, setFullState] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [errorState, setErrorState] = useState(false);

  const handleClickHeart = function () {
    if (new Date(event.date) < new Date()) {
      setErrorState(!errorState);
      return;
    }
    setConfirmModal(!confirmModal);
  };

  const handleClickShow = function () {
    setFullState(!fullState);
  };

  const deleteFavorite = function () {
    if (confirmModal) {
      dispatch(updateEvent(event));
      setConfirmModal(false);
    }
  };

  const undoDelete = function () {
    setConfirmModal(false);
  };

  const openModal = function () {
    setFullState(true);
  };

  const closeModal = function () {
    setFullState(false);
  };

  return (
    <div>
      {confirmModal && (
        <ConfirmModal
          onDelete={undoDelete}
          onUndo={deleteFavorite}
          message={
            "Are you sure you want to delete '" +
            event.name +
            "' from your favorites?"
          }
        />
      )}
      <div className={containerClass}>
        <img
          src={event.image}
          className={imageClass}
          alt={event.name}
          onClick={handleClickShow}
        />
        <div className={`${titleAndHeartClass}`}>
          <div className="cursor-pointer font-bold" onClick={handleClickShow}>
            {event.name}
          </div>
          <FaHeart
            className={`${favoriteClass} text-red-500`}
            onClick={handleClickHeart}
          />
        </div>
        <div>
          Generated by: <br />
          <b>{event.generator}</b>
        </div>

        {fullState && (
          <FavoriteEventShow
            event={event}
            key={event.name}
            onClickClose={handleClickShow}
            onClickHeart={handleClickHeart}
            open={openModal}
            onClose={closeModal}
          />
        )}
      </div>
      {errorState && (
        <div className={errorMessageClass}>
          You can not delete a past event!
        </div>
      )}
    </div>
  );
}

export default EventCard;
