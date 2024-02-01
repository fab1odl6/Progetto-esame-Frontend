import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/firebase/FirebaseConfig";
import { getDatabase, set, ref, remove } from "firebase/database";

const app = initializeApp(firebaseConfig);
const db = getDatabase();

const updateData = async function (user) {
  await set(ref(db, "/users/" + user.name + "/personalData"), {
    name: user.name,
    surname: user.surname,
    password: user.password,
    username: user.username,
  });
};

const updateFavoriteArt = function (artworks, art, user) {
  const artIndex = artworks.findIndex((item) => item.id === art.id);

  if (artIndex !== -1) {
    const updatedArtworks = [...artworks];
    updatedArtworks.splice(artIndex, 1);
    remove(ref(db, `users/${user.name}/artworks/${art.title}`));
    return updatedArtworks;
  } else {
    set(ref(db, `users/${user.name}/artworks/${art.title}`), {
      id: art.id,
      link: art.link,
      authorName: art.authorName,
      title: art.title,
      image: art.image,
      department: art.department,
      culture: art.culture,
      period: art.period,
      date: art.date,
      dimensions: art.dimensions,
      city: art.city,
      state: art.state,
      country: art.country,
      classification: art.classification,
      favorite: art.favorite,
      full: art.full,
      type: art.type,
    });

    return [...artworks, art];
  }
};

const updateFavoriteEvent = function (events, event, user) {
  const eventIndex = events.findIndex((item) => item.name === event.name);

  if (eventIndex !== -1) {
    const updatedEvents = [...events];
    updatedEvents.splice(eventIndex, 1);
    remove(ref(db, `users/${user.name}/events/${event.path}`));

    return updatedEvents;
  } else {
    set(ref(db, `users/${user.name}/events/${event.path}`), {
      id: event.id,
      name: event.name,
      image: event.image,
      date: event.date,
      department: event.department,
      guests: event.guests,
      favorite: true,
      full: false,
      path: event.path,
      userGenerated: event.userGenerated,
      generator: event.generator,
    });

    return [...events, event];
  }
};

const updatePersonalCustomEvents = function (events, event, user) {
  const eventIndex = events.findIndex((item) => item.name === event.name);

  if (eventIndex !== -1) {
    console.log("C'era, ora è rimosso");

    const updatedEvents = [...events];
    updatedEvents.splice(eventIndex, 1);
    remove(ref(db, `users/${user.name}/customEvents/${event.path}`));
    return updatedEvents;
  } else {
    console.log("Non c'era, ora è stato inserito");

    set(ref(db, `users/${user.name}/customEvents/${event.path}`), {
      id: event.id,
      name: event.name,
      image: event.image,
      date: event.date,
      department: event.department,
      guests: event.guests,
      favorite: true,
      full: false,
      path: event.path,
      userGenerated: event.userGenerated,
      generator: event.generator,
    });

    return [...events, event];
  }
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState: {
    user: {},
    logged: false,
    artworks: [],
    events: [],
    customEvents: [],
  },
  reducers: {
    registerUser(state, action) {
      updateData(action.payload);
      return {
        ...state,
        user: action.payload,
      };
    },

    setUser(state, action) {
      return {
        ...state,
        user: action.payload.matchedUser,
        artworks: action.payload.artworks,
        events: action.payload.events,
        customEvents: action.payload.customEvents,
      };
    },

    setLogged(state, action) {
      return {
        ...state,
        logged: action.payload,
      };
    },

    updateArt(state, action) {
      const updatedArtworks = updateFavoriteArt(
        state.artworks,
        action.payload,
        state.user.personalData
      );

      return {
        ...state,
        artworks: updatedArtworks,
      };
    },

    updateEvent(state, action) {
      const updatedEvents = updateFavoriteEvent(
        state.events,
        action.payload,
        state.user.personalData
      );

      return {
        ...state,
        events: updatedEvents,
      };
    },

    updateCustomEvents(state, action) {
      const updatedCustomEvents = updatePersonalCustomEvents(
        state.customEvents,
        action.payload,
        state.user.personalData
      );

      return {
        ...state,
        customEvents: updatedCustomEvents,
      };
    },

    logoutUser(state, action) {
      return {
        ...state,
        user: {},
        logged: false,
        artworks: [],
        events: [],
      };
    },

    setArtworks(state, action) {
      return {
        ...state,
        artworks: [...action.payload],
      };
    },

    setEvents(state, action) {
      console.log("setEvents");
      return {
        ...state,
        events: [...action.payload],
      };
    },

    setCustomEvents(state, action) {
      return {
        ...state,
        customEvents: [action.payload],
      };
    },

    addArtworkUser(state, action) {
      set(
        ref(
          db,
          "users/" +
            state.user.personalData.name +
            "/artworks/" +
            action.payload.title
        ),
        {
          id: action.payload.id,
          link: action.payload.link,
          authorName: action.payload.authorName,
          title: action.payload.title,
          image: action.payload.image,
          department: action.payload.department,
          culture: action.payload.culture,
          period: action.payload.period,
          date: action.payload.date,
          dimensions: action.payload.dimensions,
          city: action.payload.city,
          state: action.payload.state,
          country: action.payload.country,
          classification: action.payload.classification,
          favorite: action.payload.favorite,
          full: action.payload.full,
          type: action.payload.type,
        }
      );
      return {
        ...state,
        artworks: [...state.artworks, action.payload],
      };
    },

    removeArtworkUser(state, action) {
      remove(
        ref(
          db,
          "users/" +
            state.user.personalData.name +
            "/artworks/" +
            action.payload.title
        )
      );

      const newArray = state.artworks.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        artworks: newArray,
      };
    },

    addEventUser(state, action) {
      set(
        ref(
          db,
          "users/" +
            state.user.personalData.name +
            "/events/" +
            action.payload.path
        ),
        {
          id: action.payload.id,
          name: action.payload.name,
          image: action.payload.image,
          date: action.payload.date,
          department: action.payload.department,
          guests: action.payload.guests,
          favorite: true,
          full: false,
          path: action.payload.path,
          userGenerated: action.payload.userGenerated,
          generator: action.payload.generator,
        }
      );
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    },

    removeEventUser(state, action) {
      remove(
        ref(
          db,
          "users/" +
            state.user.personalData.name +
            "/events/" +
            action.payload.path
        )
      );

      const newArray = state.events.filter(
        (item) => item.name !== action.payload.name
      );

      return {
        ...state,
        events: newArray,
      };
    },

    addCustomEventUser(state, action) {
      set(
        ref(
          db,
          "users/" +
            state.user.personalData.name +
            "/customEvents/" +
            action.payload.path
        ),
        {
          id: action.payload.id,
          name: action.payload.name,
          image: action.payload.image,
          date: action.payload.date,
          department: action.payload.department,
          guests: action.payload.guests,
          favorite: true,
          full: false,
          path: action.payload.path,
          userGenerated: action.payload.userGenerated,
          generator: action.payload.generator,
        }
      );
      return {
        ...state,
        customEvents: [...state.customEvents, action.payload],
      };
    },

    removeCustomEventUser(state, action) {
      remove(
        ref(
          db,
          "users/" +
            state.user.personalData.name +
            "/customEvents/" +
            action.payload.path
        )
      );

      const newArray = state.customEvents.filter(
        (item) => item.name !== action.payload.name
      );

      return {
        ...state,
        customEvents: newArray,
      };
    },
  },
});

export default usersSlice;
