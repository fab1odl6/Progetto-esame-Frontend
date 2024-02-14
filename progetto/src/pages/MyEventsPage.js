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
import { clearText, setPage } from "../store";

function MyEventsPage() {
  const titleContainerClass ="flex";
  const accordionBarColor = "lightblue";
  const accordionBarColorDark = "darkblue";
  const accordionstyleClass =
    "w-full flex items-center justify-center bg-[expandedAccordion[event.id] ? accordionBarColorDark : accordionBar] text-white font-bold uppercase";
  const mainContentClass =
    "bg-gradient-to-b from-opacity-80 to-opacity-80 via-white bg-cover bg-center min-h-screen-100px";
  const accordionClass = "mb-20 mt-0";
  const typographyClass = "font-bold font-weight-bold text-uppercase";
<<<<<<< HEAD
  const sectionnametextClass ="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-shadow-lg text-center text-4xl font-bold";
=======
  const sectionnametextClass =
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-shadow-lg text-center text-2xl font-bold";
  const loginMessageClass =
    "absolute bg-red-500 max-w-lg h-12 mx-auto inset-x-0 mt-10 text-white text-2xl text-center flex justify-center items-center";
>>>>>>> 3b631b26f60805cee67de6bd1e99cf0e4e47cb1b

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearText());
    dispatch(setPage("/myEvents"));
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
            <div style={{ position: "relative" }}>
              <img
                src="https://rare-gallery.com/uploads/posts/505263-historical-art.jpg"
                style={{ width: "100%", height: "550px", objectFit: "cover" }}
              />
              <div className={sectionnametextClass}>MY EVENTS</div>
            </div>

            {events.map((event) => (
              <Accordion
                key={event.id}
                expanded={expandedAccordion[event.id]}
                onChange={() => handleToggle(event.id)}
                className={accordionClass}
                style={{
                  backgroundColor: expandedAccordion[event.id]
                    ? accordionBarColorDark
                    : "transparent",
                }}
              >
                <AccordionSummary
                  className={titleContainerClass}
                  style={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
                    padding: "0",
                    background: expandedAccordion[event.id]
                      ? accordionBarColorDark
                      : accordionBarColor,
                    marginBottom: expandedAccordion[event.id] ? "0" : "-1px",
                  }}
                >
                  <div className={accordionstyleClass}>
                    <Typography
                      variant="h6"
                      className={typographyClass}
                      style={{ color: "white" }}
                    >
                      {event.title}
                    </Typography>
                    {expandedAccordion[event.id] ? (
                      <GoChevronDown style={{ color: "white" }} />
                    ) : (
                      <GoChevronLeft style={{ color: "white" }} />
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    backgroundColor: "white",
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
        <div>
          <div className={loginMessageClass}>
            <p>You must be logged in to access this page!</p>
          </div>
          <LoginPage />
        </div>
      )}
    </div>
  );
}

export default MyEventsPage;
