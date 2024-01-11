import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventContainer from './EventContainer';
import EventCard from './EventCard';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import className from "classnames";


function EventsPage() {
  const searchBarHeader = className("justify-center align-center flex");
  const searchBar = className("mt-5 border-1 h-1/6 w-5/6 text-gray-500 justify-between flex");
  const searchIcon = className("self-end mb-6");
  const titleContainer = className("flex");

  const [expandedAccordion, setExpandedAccordion] = useState(false);

  const handleToggle = function () {
    setExpandedAccordion(!expandedAccordion);
  }

  let chevron = <GoChevronDown onToggle={handleToggle} />;
  if (expandedAccordion) {
    chevron = <GoChevronDown onToggle={handleToggle} />
  } else {
    chevron = <GoChevronLeft onToggle={handleToggle} />
  }

  const events = [
    { id: 1, title: 'Eventi in programma', content: <EventCard future={true} /> },
    { id: 2, title: 'Eventi passati', content: <EventCard future={false} /> },
  ];


  const handleAccordionToggle = (index) => {
    setExpandedAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <div className={searchBarHeader}>
        <div className={searchBar}>
          Cerca ...
          <SearchIcon className={searchIcon} />
        </div>
      </div>
      <div className="mainContent" style={{
        background: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("background-image-url")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh - 100px)',
      }}>
        <h1 style={{ textAlign: 'center', paddingTop: '50px', fontWeight: 'bold', fontSize: '2em' }}>EVENTS</h1>

        {events.map((event) => (
          <Accordion
            key={event.id}
            expanded={expandedAccordion === event.id}
            onChange={() => handleAccordionToggle(event.id)}
          >
            <AccordionSummary>
              <div className={titleContainer}>
                <Typography>{event.title}</Typography>
                {chevron}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                <EventContainer {...{ future: event.id === 1 ? true : false }} />
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;