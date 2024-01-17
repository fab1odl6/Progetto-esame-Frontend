import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventContainer from './EventContainer';
import EventCard from './EventCard';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import className from "classnames";
import { useSelector } from 'react-redux';
import LoginPage from '../pages/Login';

function EventsPage() {
  const searchBarHeader = className("justify-center align-center flex");
  const searchBar = className("mt-5 border-1 h-1/6 w-5/6 text-gray-500 justify-between flex");
  const searchIcon = className("self-end mb-6");
  const titleContainer = className("flex");
  const mainContent = className("bg-gradient-to-b from-opacity-80 to-opacity-80 via-white bg-cover bg-center min-h-screen-100px background-image: url('background-image-url'); padding: 20px;");
  const title = className("text-center font-bold text-4xl my-20");
  const accordion = className("mb-20");
  const typography = className("font-bold");

  const [expandedAccordion, setExpandedAccordion] = useState({
    1: true,
    2: false,
  });

  const handleToggle = function (id) {
    setExpandedAccordion((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const events = [
    { id: 1, title: 'Eventi in programma', content: <EventCard future={true} /> },
    { id: 2, title: 'Eventi passati', content: <EventCard future={false} /> },
  ];

  const { logged } = useSelector((state) => {
    return state.users;
  })

  return (
    <div>
      {logged ? (<div>
        <div className={searchBarHeader}>
          <div className={searchBar}>
            Cerca ...
            <SearchIcon className={searchIcon} />
          </div>
        </div>
        <div className={mainContent}>
          <h1 className={title}>EVENTS</h1>

          {events.map((event) => (
            <Accordion
              key={event.id}
              expanded={expandedAccordion[event.id]}
              onChange={() => handleToggle(event.id)}
              className={accordion}
            >
              <AccordionSummary>
                <div className={titleContainer}>
                  <Typography variant="h6" className={typography}>{event.title}</Typography>
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
