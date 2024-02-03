import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child, set, remove } from "firebase/database";
import { firebaseConfig } from "../components/firebase/FirebaseConfig";

const artArray = [];
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());

async function writeData() {
  try {
    const url =
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
    const searchRes = await fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?q=christ"
    );
    const searchData = await searchRes.json();
    const objectIDs = searchData.objectIDs;

    const objectRequests = objectIDs.slice(1, 6).map(async (objectId) => {
      const resObj = await fetch(url + objectId);
      const dataObj = await resObj.json();

      if (
        dataObj.message !== "Not a valid object" &&
        dataObj.primaryImage !== ""
      ) {
        artArray.push({
          id: dataObj.objectID,
          link: dataObj.objectURL,
          authorName: dataObj.artistDisplayName,
          title: dataObj.title,
          image: dataObj.primaryImage,
          department: dataObj.department,
          culture: dataObj.culture,
          period: dataObj.period,
          date: dataObj.objectEndDate,
          dimensions: dataObj.dimensions,
          city: dataObj.city,
          state: dataObj.state,
          country: dataObj.artistNationality,
          classification: dataObj.classification,
          favorite: false,
          full: false,
          type: dataObj.objectName,
        });
      }
    });

    await Promise.all(objectRequests);
  } catch (error) {
    console.error("Errore durante il recupero dei dati: ", error);
  }

  const db = getDatabase();
  console.log(artArray);
  artArray.map((dataObj) => {
    console.log(dataObj.title);
    set(ref(db, "artworks/" + dataObj.title), {
      id: dataObj.id,
      link: dataObj.link,
      authorName: dataObj.authorName,
      title: dataObj.title,
      image: dataObj.image,
      department: dataObj.department,
      culture: dataObj.culture,
      period: dataObj.period,
      date: dataObj.date,
      dimensions: dataObj.dimensions,
      city: dataObj.city,
      state: dataObj.state,
      country: dataObj.country,
      classification: dataObj.classification,
      favorite: false,
      full: false,
      type: dataObj.type,
    });
  });
}

//await writeData();

async function readData() {
  const artworksRef = child(dbRef, "artworks");

  try {
    const snapshot = await get(artworksRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const art = data[key];
          artArray.push({
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
        }
      }
    } else {
      console.log("No data available");
    }
  } catch (e) {
    console.error(e);
  }
}

await readData();

const artworksSlice = createSlice({
  name: "artworks",
  initialState: {
    array: artArray,
    index: 0,
    favorite: false,
  },
  reducers: {
    swipeRightArt(state, action) {
      const newIndex = state.index + 1;
      if (newIndex === state.array.length) {
        return state;
      }
      return { ...state, index: newIndex };
    },

    swipeLeftArt(state, action) {
      const newIndex = state.index - 1;
      if (newIndex === -1) {
        return state;
      }
      return { ...state, index: newIndex };
    },

    switchFavoriteArt(state, action) {
      const newFavorite = !state.array[state.index].favorite;
      const newArray = [...state.array];
      newArray[state.index] = {
        ...newArray[state.index],
        favorite: newFavorite,
      };

      return { ...state, array: newArray, favorite: newFavorite };
    },
  },
});

export default artworksSlice;
