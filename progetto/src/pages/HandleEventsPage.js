import AddAnEvent from "../components/events/AddAnEvent";
import HandleEvents from "../components/events/HandleEvents";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "../pages/Login";
import { clearText, setPage } from "../store";
import { useEffect } from "react";

function HandleEventsPage() {
  const containerClass = "flex justify-center h-auto lg:flex";
  const addClass = "w-md h-full lg:w-1/2";
  const separatorClass = "m-4 hidden lg:block";
  const handleClass = "mt-10 w-md h-full lg:w-1/2";
  const loginMessageClass =
    "absolute bg-red-500 max-w-lg h-12 mx-auto inset-x-0 mt-10 text-white text-2xl text-center flex justify-center items-center";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearText());
    dispatch(setPage("/handleEvents"));
  }, []);

  const { logged } = useSelector((state) => {
    return state.users;
  });

  return (
    <div>
      {logged ? (
        <div className={containerClass}>
          <div className={addClass}>
            <AddAnEvent />
          </div>
          <div className={separatorClass}></div>
          <div className={handleClass}>
            <HandleEvents />
          </div>
        </div>
      ) : (
        <div>
          <div className={loginMessageClass}>
            <p>You must be logged in to access this page!</p>
          </div>
          <LoginPage />
        </div>
      )}
    </div>
  );
}

export default HandleEventsPage;
