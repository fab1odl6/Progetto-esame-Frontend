import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import EventContainer from "../components/events/EventContainer";
import EventCard from "../components/events/EventCard";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import { useSelector, useDispatch } from "react-redux";
import LoginPage from "./Login";
import { clearText } from "../store";

function MyEventsPage() {
  const titleContainerClass = "flex";
  const mainContentClass =
    "bg-gradient-to-b from-opacity-80 to-opacity-80 via-white bg-cover bg-center min-h-screen-100px";
  const titleClass = "text-center font-bold text-4xl my-20";
  const accordionClass = "mb-20";
  const typographyClass = "font-bold";

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearText());
  }, []);

  const [expandedAccordion, setExpandedAccordion] = useState({
    1: true,
    2: false,
  });

  const handleToggle = function (id) {
    setExpandedAccordion((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const accordionBarColor = 'lightblue'; // Colore per la barrettta dell'accordion e il container della scritta
  const accordionBarColorDark = 'darkblue'; // Colore più scuro quando l'Accordion è aperto

  const events = [
    { id: 1, title: "Future Events", content: <EventCard future={true} /> },
    { id: 2, title: "Past Events", content: <EventCard future={false} /> },
  ];

  const { logged } = useSelector((state) => {
    return state.users;
  });

  return (
    <div>
      {logged ? (
        <div>
          <div className={mainContentClass}>
            {/* Immagine con scritta */}
            <div style={{ position: 'relative' }}>
              <img
                src="https://rare-gallery.com/uploads/posts/505263-historical-art.jpg"
                style={{ width: '100%', height: '550px', objectFit: "cover" }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  textShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
                  textAlign: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                }}
              >
                MY EVENTS
              </div>
            </div>

            {events.map((event) => (
              <Accordion
                key={event.id}
                expanded={expandedAccordion[event.id]}
                onChange={() => handleToggle(event.id)}
                className={accordionClass}
                style={{ backgroundColor: expandedAccordion[event.id] ? accordionBarColorDark : 'transparent' }}
              >
                <AccordionSummary
                  className={titleContainerClass}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
                    padding: '0',
                    background: expandedAccordion[event.id] ? accordionBarColorDark : accordionBarColor,
                    marginBottom: expandedAccordion[event.id] ? '0' : '-1px',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: expandedAccordion[event.id] ? accordionBarColorDark : accordionBarColor,
                      color: 'white',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                    }}
                  >
                    <Typography variant="h6" className={`${typographyClass} font-weight-bold text-uppercase`} style={{ color: 'white' }}>
                      {event.title}
                    </Typography>
                    {expandedAccordion[event.id] ? (
                      <GoChevronDown style={{ color: 'white' }} />
                    ) : (
                      <GoChevronLeft style={{ color: 'white' }} />
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    backgroundColor: 'lightgray',
                  }}
                >
                  <div>
                    <EventContainer
                      {...{ future: event.id === 1 ? true : false }}
                    />
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
}

export default MyEventsPage;
