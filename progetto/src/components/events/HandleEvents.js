import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/FirebaseConfig";
import { get, child, ref, getDatabase } from "firebase/database";
import HandleEventCard from "./HandleEventCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function HandleEvents() {
  const containerClass =
    "max-w-screen-md min-w-screen-md h-full p-4 mt-4 shadow overflow-y-auto";
  const titleClass = "text-2xl font-bold mb-4 mt-2 mx-auto text-center";
  const emptyContainerClass = "max-w-md min-w-md";

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

  const render = localEvents.map((event) => {
    return <HandleEventCard key={event.name} event={event} />;
  });

  return (
    <div className={containerClass}>
      <div className={titleClass}>CUSTOM EVENTS</div>
      <div>
        {localEvents.length > 0 ? (
          <div>{render}</div>
        ) : (
          <div className={`custom-message-container ${emptyContainerClass}`}>
            <p className="custom-message-text">
              You haven't created an event yet,
              <br />
              give it a try!
            </p>
            {/* Aggiungi un pulsante di prova se necessario */}
            {/* <button className="custom-message-try-btn" onClick={handleTryButtonClick}>
              Try Now
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default HandleEvents;
