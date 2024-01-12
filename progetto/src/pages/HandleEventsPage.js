import AddAnEvent from "../components/AddAnEvent";
import className from "classnames";
import HandleEvents from "../components/HandleEvents";


function HandleEventsPage() {

    const containerClass = className("flex justify-between items-center");

    return (
        <div className={containerClass}>
            <AddAnEvent className="" />
            <HandleEvents className="" />
        </div>
    )
}

export default HandleEventsPage;