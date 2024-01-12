import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/FirebaseConfig";
import { get, child, ref, getDatabase } from "firebase/database";
import EventCard from "./EventCard";
import { GoChevronDown, GoChevronRight } from "react-icons/go";
import { useState } from "react";


const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

const eventsRef = child(dbRef, "users/Fabio/events");
const eventsArray = [];

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
        console.log(eventsArray);
    } catch (e) {
        console.error(e);
    }
}

await readData();


function EventContainer({ future }) {
    let render = [];
    const today = new Date();



    if (future) {
        render = eventsArray.map((event) => {
            const eventDate = new Date(event.date);

            if (eventDate >= today) {
                return (
                    <EventCard event={event} />
                )
            }
        })
    } else {
        render = eventsArray.map((event) => {
            const eventDate = new Date(event.date);

            if (eventDate < today) {
                return (
                    <EventCard event={event} />
                )
            }
        });
    }


    return (
        <div>
            {render}
        </div>
    )
}


export default EventContainer;
