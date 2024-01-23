import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/FirebaseConfig";
import { get, child, ref, getDatabase } from "firebase/database";
import HandleEventCard from "./HandleEventCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setEvents } from "../../store";

function HandleEvents() {

    const containerClass = "w-max h-full p-4 mt-4 shadow overflow-y-auto";

    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    const dbRef = ref(db);

    const { user, customEvents } = useSelector((state) => {
        return state.users;
    });
    
    const [eventsLocal, setEventsLocal] = useState(customEvents);
    const [submit, setSubmit] = useState(false);

    const dispatch = useDispatch();

    const updateLocal = async () => {
        const eventsRef = child(dbRef, "/users/" + user.personalData.name + "/customEvents/")

        try {
            const snapshot = await get(eventsRef);

            if (snapshot.exists()) {
                const eventData = Object.values(snapshot.val());
                dispatch(setEvents(eventData));
                setEventsLocal(eventData);
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        updateLocal();
    }, [customEvents, eventsLocal]);

    const render = customEvents.map((event) => {
        return (
            <HandleEventCard key={event.name} event={event} submit={submit} setSubmit={setSubmit} />
        )
    })

    return (
        <div className={containerClass}>
            {render}
        </div>
    )
}

export default HandleEvents;