import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/FirebaseConfig";
import { get, child, ref, getDatabase } from "firebase/database";
import HandleEventCard from "./HandleEventCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setEvents, updateEvent } from "../../store";

function HandleEvents() {
  const containerClass =
    "max-w-md min-w-md h-full p-4 mt-4 shadow overflow-y-auto";
  const titleClass = "text-lg font-bold mb-4 mt-2 mx-auto text-center";
  const emptyContainerClass = "max-w-md min-w-md";

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
    const eventsRef = child(
      dbRef,
      "/users/" + user.personalData.name + "/customEvents/"
    );

    try {
      const snapshot = await get(eventsRef);

      if (snapshot.exists()) {
        const eventData = Object.values(snapshot.val());
        dispatch(setEvents(eventData));
        setEventsLocal(eventData);
      } else {
        setEventsLocal([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log("update variabile");
    updateLocal();
  }, [customEvents]);

  const handleClickDelete = function () {
    setSubmit(!submit);
  };

  const render = eventsLocal.map((event) => {
    return (
      <HandleEventCard
        key={event.name}
        event={event}
        submit={submit}
        setSubmit={setSubmit}
        handleClickDeleteParent={handleClickDelete}
      />
    );
  });

  return (
    <div className={containerClass}>
      <div className={titleClass}>Custom Events</div>
      <div>
        {eventsLocal.length > 0 ? (
          <div>{render}</div>
        ) : (
          <div className={emptyContainerClass}>
            You haven't created an event yet,
            <br />
            give it a try!
          </div>
        )}
      </div>
    </div>
  );
}

export default HandleEvents;
