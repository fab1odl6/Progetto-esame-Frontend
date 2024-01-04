import { createSlice } from "@reduxjs/toolkit";

const artArray = [];

const fetchData = async function () {
    try {
        const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
        const searchRes = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q=sky");
        const searchData = await searchRes.json();
        const objectIDs = searchData.objectIDs;

        const objectRequests = objectIDs.slice(1, 6).map(async (objectId) => {
            const resObj = await fetch(url + objectId);
            const dataObj = await resObj.json();

            if (dataObj !== null) {
                artArray.push({
                    id: dataObj.objectID,
                    link: dataObj.objectURL,
                    authorName: dataObj.artistDisplayName,
                    title: dataObj.title,
                    image: dataObj.primaryImage,
                    department: dataObj.department,
                    culture: dataObj.culture,
                    period: dataObj.period,
                    date: dataObj.objectDate,
                    dimensions: dataObj.dimensions,
                    city: dataObj.city,
                    state: dataObj.state,
                    country: dataObj.country,
                    classification: dataObj.classification,
                    favorite: false,
                    full: false
                });
            }
        });

        console.log("artArray: ", artArray);
        await Promise.all(objectRequests);
    } catch (error) {
        console.error("Errore durante il recupero dei dati: ", error);
    }
};

await fetchData();

const artworksSlice = createSlice({
    name: "artworks",
    initialState: {
        array: artArray,
        index: 0,
        favorite: false,
        full: false
    },
    reducers: {
        swipeRightArt(state, action) {
            const newIndex = (state.index + 1) % state.array.length;
            return { ...state, index: newIndex };
        },

        swipeLeftArt(state, action) {
            const newIndex = (state.index - 1 + state.array.length) % state.array.length;
            return { ...state, index: newIndex };
        },

        switchFavoriteArt(state, action) {
            const newFavorite = !state.array[state.index].favorite;
            const newArray = [...state.array];
            newArray[state.index] = { ...newArray[state.index], favorite: newFavorite };

            return { ...state, array: newArray, favorite: newFavorite };
        },

        switchFullArt(state, action) {
            const newFull = !state.array[state.index].full;
            const newArray = [...state.array];
            newArray[state.index] = { ...newArray[state.index], full: newFull };

            return { ...state, array: newArray, full: newFull };
        },
    },
});

export default artworksSlice;
export { fetchData };