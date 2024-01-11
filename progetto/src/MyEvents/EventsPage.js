import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const EventsPage = () => {
  const searchBarHeader = "justify-center align-center flex";
  const searchBar = "mt-5 border-1 h-1/6 w-5/6 text-gray-500 justify-between flex";
  const searchIcon = "self-end mb-6";

  const [expandedAccordion, setExpandedAccordion] = useState(null);

  const events = [
    { id: 1, title: 'Eventi in programma', content: '...' },
    { id: 2, title: 'Eventi passati', content: '...' },
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
              <Typography>{event.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {event.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;