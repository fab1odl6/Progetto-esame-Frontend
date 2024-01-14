import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseConfig";
import { get, child, ref, getDatabase } from "firebase/database";
import HandleEventCard from "./HandleEventCard";
import className from "classnames";

const events = [];
async function readData() {
    const app = initializeApp(firebaseConfig);
    const dbRef = ref(getDatabase());

    const eventsRef = child(dbRef, "/users/Fabio/customEvents");
    try {
        const snapshot = await get(eventsRef);
        if (snapshot.exists) {
            const data = snapshot.val();
            for (const key in data) {
                events.push(data[key]);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

await readData();


function HandleEvents() {

    const containerClass = className("");

    const render = events.map((event) => {
        return (
            <HandleEventCard event={event} />
        )
    })

    return (
        <div className={containerClass}>
            {render}
        </div>
    )
}

export default HandleEvents;