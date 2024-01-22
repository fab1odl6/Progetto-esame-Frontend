import AddAnEvent from "../components/events/AddAnEvent";
import HandleEvents from "../components/events/HandleEvents";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "../pages/Login";
import { clearText } from "../store";


function HandleEventsPage() {

    const containerClass = "flex justify-center h-[80vh]";
    const addClass = "h-full";
    const separatorClass = "m-4";
    const handleClass = "mt-10 h-full";

    const dispatch = useDispatch();
    dispatch(clearText());


    const { logged } = useSelector((state) => {
        return state.users;
    })

    return (
        <div>
            {logged ? (
                <div className={containerClass}>
                    <AddAnEvent className={addClass} />
                    <div className={separatorClass}></div>
                    <HandleEvents className={handleClass} />
                </div>
            ) : (
                <LoginPage />
            )
            }
        </div>
    )
}

export default HandleEventsPage;
