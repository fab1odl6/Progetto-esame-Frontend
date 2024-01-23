import { useSelector } from "react-redux";
import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import NavigationContext from "../../context/navigation";
import { Dialog, DialogContent } from "@mui/material";
import LoginModals from "../modals/loginModals";

function EventShow({
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

  const { array, index } = useSelector((state) => {
    return state.events;
  });

  const { events, logged } = useSelector((state) => {
    return state.users;
  });
  const [modal, setModal] = useState(false);

  const handleClickHeart = function (event) {
    if (logged) {
      onClickHeart(event);
    } else {
      setModal(true);
    }
  };

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
  };

  const handleClickCloseLog = function () {
    setModal(false);
  };

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
                key={array[index].id}
                src={array[index].image}
                alt={array[index].name}
              />
            </div>
            <div className={firstRowClass}>
              {array[index].name && <div>Title: {array[index].name}</div>}
              {favoriteState ? (
                <FaHeart
                  className={favoriteClass}
                  onClick={() => handleClickHeart(array[index])}
                />
              ) : (
                <FaRegHeart
                  className={favoriteClass}
                  onClick={() => handleClickHeart(array[index])}
                />
              )}
            </div>
            {array[index].department && (
              <div>Department: {array[index].department}</div>
            )}
            {array[index].guests && <div>Guests: {array[index].guests}</div>}
            {array[index].date && <div>Date: {array[index].date}</div>}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EventShow;
