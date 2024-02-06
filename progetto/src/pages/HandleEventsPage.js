import AddAnEvent from "../components/events/AddAnEvent";
import HandleEvents from "../components/events/HandleEvents";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "../pages/Login";
import { clearText } from "../store";
import { useEffect } from "react";

function HandleEventsPage() {
  const containerClass = "flex justify-center h-auto lg:flex"; // Aggiungi lg:flex per l'allineamento orizzontale su dispositivi LG
  const addClass = "w-md h-full lg:w-1/2"; // Aggiungi lg:w-1/2 per far occupare metà della larghezza su dispositivi LG
  const separatorClass = "m-4 hidden lg:block"; // Nascondi il separatore su dispositivi non LG
  const handleClass = "mt-10 w-md h-full lg:w-1/2"; // Aggiungi lg:w-1/2 per far occupare metà della larghezza su dispositivi LG

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
          <div className={addClass}>
            <AddAnEvent />
          </div>
          <div className={separatorClass}></div>
          <div className={handleClass}>
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
