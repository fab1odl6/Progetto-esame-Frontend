import EventCard from "./EventCard";

function EventGrid({ events }) {
  const gridClass = "grid grid-cols-4 gap-4 z-50 mb-4";

  const renderCard = events.map((event) => {
    return <EventCard key={event.name} event={event} />;
  });

  return (
    <div>
      <div className={gridClass}>{renderCard}</div>
    </div>
  );
}

export default EventGrid;
