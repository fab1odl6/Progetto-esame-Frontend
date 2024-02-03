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
                style={{ backgroundColor: 'blue' }}
              >
                <AccordionSummary
                  className={titleContainerClass}
                  style={{
                    background: 'linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))',
                  }}
                >
                  <div>
                    <Typography variant="h6" className={typographyClass}>
                      {event.title}
                    </Typography>
                    {expandedAccordion[event.id] ? (
                      <GoChevronDown />
                    ) : (
                      <GoChevronLeft />
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
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
