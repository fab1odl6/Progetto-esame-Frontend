import { configureStore, createSlice } from "@reduxjs/toolkit";

let artArray = [];


const fetchData = async function () {
    try {
        let url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/";
        const searchRes = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?q=sunflowers");
        const searchData = await searchRes.json();
        const objectIDs = searchData.objectIDs || [];

        const objectRequests = objectIDs.slice(0, 5).map(async (objectId) => {
            const resObj = await fetch(url + objectId);
            const dataObj = await resObj.json();

            artArray.push({
                id: dataObj.objectID,
                link: dataObj.linkResource,
                name: dataObj.artistDisplayName,
                image: dataObj.primaryImage,
                favorite: false,
                full: false
            });
        });

        await Promise.all(objectRequests);

        console.log("artArray:", artArray);
    } catch (error) {
        console.error("Errore durante il recupero dei dati:", error);
    }
};

fetchData();

fetchData();

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