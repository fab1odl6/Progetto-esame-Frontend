import AddAnEvent from "../components/events/AddAnEvent";
import HandleEvents from "../components/events/HandleEvents";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "../pages/Login";
import { clearText } from "../store";
import { useEffect } from "react";

function HandleEventsPage() {
  const containerClass = "flex justify-center h-auto"; // Cambia 80vh a auto
  const addClass = "w-md h-full";
  const separatorClass = "m-4";
  const handleClass = "mt-10 w-md h-full";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearText());
  }, []);

  const { logged } = useSelector((state) => {
    return state.users;
  });

  return (
    <div className={containerClass}>
      {logged ? (
        <>
          <div className="contenitore-larghezza-completa">
            <AddAnEvent />
          </div>
          <div className={separatorClass}></div>
          <div className="contenitore-larghezza-completa">
            <HandleEvents />
          </div>
        </>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default HandleEventsPage;
