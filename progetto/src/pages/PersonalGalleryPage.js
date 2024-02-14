import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";
import { firebaseConfig } from "../components/firebase/FirebaseConfig";
import ArtGrid from "../components/artworks/ArtGrid";
import {setArtworks,clearText,setPage,} from "../store";
import LoginPage from "./Login";
import PageButtons from "../components/header & footer/PageButtons";

function PersonalGalleryPage() {
  const imageboxClass = "relative w-full h-200px overflow-hidden";
  const textonimageClass = "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold text-4xl z-10";
  const gridboxClass = "max-w-screen-xl mx-auto flex flex-col items-center relative";
  const loginMessageClass ="absolute bg-red-500 max-w-lg h-12 mx-auto inset-x-0 mt-10 text-white text-2xl text-center flex justify-center items-center";

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const dbRef = ref(db);
  const dispatch = useDispatch();
  const [artworksLocal, setArtworksLocal] = useState([]);
  const currentPage = useSelector((state) => state.activePage.personalGalleryPage);
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const { user, logged } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    dispatch(clearText());
    dispatch(setPage("/personalGallery"));
  }, []);

  const localUpdate = async () => {
    const artworksRef = child(
      dbRef,
      "/users/" + user.personalData.username + "/artworks"
    );

    try {
      const snapshot = await get(artworksRef);

      if (snapshot.exists()) {
        const artworksData = snapshot.val();

        if (Array.isArray(artworksData)) {
          dispatch(setArtworks(artworksData));
          setArtworksLocal(artworksData);
        } else if (artworksData && typeof artworksData === "object") {
          const dataArray = Object.values(artworksData);
          dispatch(setArtworks(dataArray));
          setArtworksLocal(dataArray);
        } else {
          console.error("Artworks data is not in a recognized format.");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (logged) {
      localUpdate();
    }
  }, [dispatch, logged]);

  const currentItems = artworksLocal.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      {logged && (
        <div className={imageboxClass}>
          <img
            src="https://www.lucelight.it/file/fotoblocco-156237.jpg"
            style={{ maxHeight: "550px", width: "100%", objectFit: "cover" }}
            className="filter brightness-50"
            alt="Artwork"
          />
          <div className={textonimageClass}>PERSONAL GALLERY</div>
        </div>
      )}
      {logged ? (
        <div className={gridboxClass}>
          <ArtGrid artworks={currentItems} />
          <PageButtons indexOfLastItem={indexOfLastItem} filteredArray={artworksLocal} currentPage={currentPage} page="PersonalGallery"/>
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

export default PersonalGalleryPage;
