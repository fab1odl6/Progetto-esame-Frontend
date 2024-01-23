import EventGrid from "./EventGrid";
import { useSelector } from "react-redux";

function EventContainer({ future }) {
  const events = useSelector((state) => {
    return state.users.events;
  });

  const today = new Date();

  const filteredEvents = future
    ? events.filter((event) => new Date(event.date) >= today)
    : events.filter((event) => new Date(event.date) < today);

  return (
    <div>
      {filteredEvents.length > 0 ? (
        <div>
          <EventGrid events={filteredEvents} />
        </div>
      ) : future ? (
        <p>No future events to display</p>
      ) : (
        <p>No past events to display.</p>
      )}
    </div>
  );
}

export default EventContainer;
