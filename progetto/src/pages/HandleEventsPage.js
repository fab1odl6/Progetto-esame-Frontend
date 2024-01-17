import AddAnEvent from "../components/AddAnEvent";
import className from "classnames";
import HandleEvents from "../components/HandleEvents";


function HandleEventsPage() {

    const containerClass = className("flex justify-center h-[80vh]");

    return (
        <div className={containerClass}>
            <AddAnEvent className="h-full" />
            <div className="m-4"></div>
            <HandleEvents className="mt-10 h-full" />
        </div>
    )
}

export default HandleEventsPage;
