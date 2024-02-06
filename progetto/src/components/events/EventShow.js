import { useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import NavigationContext from "../../context/navigation";
import { Dialog, DialogContent } from "@mui/material";
import LoginModals from "../modals/loginModals";

function EventShow({
  event,
  favoriteState,
  onClickHeart,
  setFavoriteState,
  open,
  onClose,
}) {
  const modalClass =
    "fixed inset-0 flex flex-col items-center justify-center w-screen h-screen bg-blue bg-auto z-1000";
  const containerClass = "border-slate-300 border-solid border-4 bg-white";
  const imageContainerClass = "flex justify-between relative";
  const imageClass = "max-w-lg max-h-lg";
  const firstRowClass = "flex justify-between";
  const favoriteClass = "ml-auto text-2xl";

  const { navigate } = useContext(NavigationContext);

  const { index } = useSelector((state) => {
    return state.events;
  });
  const { events, logged } = useSelector((state) => {
    return state.users;
  });
  const [modal, setModal] = useState(false);

  const handleClickHeart = function () {
    if (logged) {
      onClickHeart(event);
    } else {
      setModal(true);
    }
  };

  const handleClickButton = function () {
    navigate("/login");
  };

  const handleClickCloseLog = function () {
    setModal(false);
  };

  useEffect(() => {
    if (logged) {
      if (events.find((item) => item.name === event.name)) {
        setFavoriteState(true);
      } else {
        setFavoriteState(false);
      }
    }
  }, [index, logged]);

  return (
    <div className={modalClass}>
      {modal && (
        <LoginModals
          onClickButton={handleClickButton}
          onCloseLog={handleClickCloseLog}
          open={handleClickHeart}
        />
      )}
      <Dialog open={open} onClose={onClose}>
        <DialogContent>
          <div className={containerClass}>
            <div className={imageContainerClass}>
              <img
                className={imageClass}
                key={event.id}
                src={event.image}
                alt={event.name}
              />
            </div>
            <div className={firstRowClass}>
              {event.name && <div>Title: {event.name}</div>}
              {favoriteState ? (
                <FaHeart className={favoriteClass} onClick={handleClickHeart} />
              ) : (
                <FaRegHeart
                  className={favoriteClass}
                  onClick={handleClickHeart}
                />
              )}
            </div>
            {event.department && <div>Department: {event.department}</div>}
            {event.guests && <div>Guests: {event.guests}</div>}
            {event.date && <div>Date: {event.date}</div>}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EventShow;
