import AddAnEvent from "../components/AddAnEvent";
import className from "classnames";
import HandleEvents from "../components/HandleEvents";


function HandleEventsPage() {

    const containerClass = className("flex justify-center h-min");

    return (
        <div className={containerClass}>
            <AddAnEvent />
            <div className="m-4"></div>
            <HandleEvents className="mt-4" />
        </div>
    )
}

export default HandleEventsPage;
