import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/FirebaseConfig";
import { get, child, ref, getDatabase } from "firebase/database";
import HandleEventCard from "./HandleEventCard";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

function HandleEvents() {
  const containerClass =
    "max-w-screen-md min-w-screen-md h-full p-4 mt-4 shadow";
  const titleClass =
    "text-2xl font-bold mb-4 mt-2 mx-auto text-center text-[#444455]";
  const emptyContainerClass = "custom-message-container max-w-md min-w-md";
  const textClass = "custom-message-text text-[#444455]";

  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const dbRef = ref(db);

  const { user, customEvents } = useSelector((state) => {
    return state.users;
  });

  const [localEvents, setLocalEvents] = useState([]);

  const updateLocal = async () => {
    const eventsRef = child(
      dbRef,
      "/users/" + user.personalData.name + "/customEvents/"
    );

    try {
      const snapshot = await get(eventsRef);

      if (snapshot.exists()) {
        const eventData = Object.values(snapshot.val());
        setLocalEvents(eventData);
      } else {
        setLocalEvents([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    updateLocal();
  }, [customEvents]);

  const eventsContainerRef = useRef(null);

  return (
    <div className={containerClass}>
      <div className={titleClass}>CUSTOM EVENTS</div>
      <div
        className="max-h-100 overflow-y-auto" 
        style={{ maxHeight: '600px' }}
        ref={eventsContainerRef}
      >
        {localEvents.length > 0 ? (
          localEvents.map((event, index) => (
            <HandleEventCard key={event.name} event={event} />
          ))
        ) : (
          <div className={emptyContainerClass}>
            <p className={textClass}>
              You haven't created an event yet, give it a try!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HandleEvents;
