import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import EventContainer from './EventContainer';
import EventCard from './EventCard';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import className from "classnames";
import { useSelector } from 'react-redux';
import LoginPage from '../pages/Login';


function EventsPage() {

  const titleContainerClass = className("flex");
  const mainContentClass = className("bg-gradient-to-b from-opacity-80 to-opacity-80 via-white bg-cover bg-center min-h-screen-100px background-image: url('background-image-url'); padding: 20px;");
  const titleClass = className("text-center font-bold text-4xl my-20");
  const accordionClass = className("mb-20");
  const typographyClass = className("font-bold");


  const [expandedAccordion, setExpandedAccordion] = useState({
    1: true,
    2: false,
  });

  const handleToggle = function (id) {
    setExpandedAccordion((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const events = [
    { id: 1, title: 'Future Events', content: <EventCard future={true} /> },
    { id: 2, title: 'Past Events', content: <EventCard future={false} /> },
  ];

  const { logged } = useSelector((state) => {
    //console.log("STATO:",state.users)
    return state.users;
  })


  return (
    <div>
      {logged ? (<div>
        <div className={mainContentClass}>
          <h1 className={titleClass}>EVENTS</h1>

          {events.map((event) => (
            <Accordion
              key={event.id}
              expanded={expandedAccordion[event.id]}
              onChange={() => handleToggle(event.id)}
              className={accordionClass}
            >
              <AccordionSummary>
                <div className={titleContainerClass}>
                  <Typography variant="h6" className={typographyClass}>{event.title}</Typography>
                  {expandedAccordion[event.id] ? <GoChevronDown /> : <GoChevronLeft />}
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
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default EventsPage;
