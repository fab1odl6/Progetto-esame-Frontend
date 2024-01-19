import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/FirebaseConfig";
import { get, child, ref, getDatabase } from "firebase/database";
import EventCard from "./EventCard";
import { useSelector } from "react-redux";

//const app = initializeApp(firebaseConfig);
//const dbRef = ref(getDatabase());

//const eventsRef = child(dbRef, "users/Fabio/events");
//const eventsArray = [];

/*
async function readData() {
    try {
        const snapshot = await get(eventsRef);
        if (!snapshot.exists()) {
            console.error("Errore nel db");
            return;
        }
        const events = snapshot.val();

        for (const key in events) {
            eventsArray.push(events[key]);
        }
    } catch (e) {
        console.error(e);
    }
}

await readData();
*/


function EventContainer({ future }) {

    const events  = useSelector((state) => {
        //console.log("EVENTI INTERNO:",events)
        return state.users.events;
    })
    //console.log("EVENTI:",events)

    const today = new Date();

    /*
    const filteredEvents = future
        ? eventsArray.filter((event) => new Date(event.date) >= today)
        : eventsArray.filter((event) => new Date(event.date) < today);
    */

    const filteredEvents = future
        ? events.filter((event) => new Date(event.date) >= today)
        : events.filter((event) => new Date(event.date) < today);

    const renderedEvents = filteredEvents.map((event) => (
        <EventCard key={event} event={event} />
    ));

    return (
        <div>
            {filteredEvents.length > 0 ? (
                <div>
                    {renderedEvents}
                </div>
            ) : (
                future ? (
                    <p>No future events to display</p>
                ) : (
                    <p>No past events to display.</p>
                )
            )}
        </div>
    );
}


export default EventContainer;
