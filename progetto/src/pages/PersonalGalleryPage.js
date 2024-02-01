import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";
import { firebaseConfig } from "../components/firebase/FirebaseConfig";
import ArtGrid from "../components/artworks/ArtGrid";
import { setArtworks, clearText, setPersonalGalleryPage } from "../store";
import LoginPage from "./Login";
import { animateScroll as scroll } from 'react-scroll';

function PersonalGalleryPage() {

  const artTextClass = "text-center font-bold text-4xl my-20";
  const buttonClass = "flex items-center px-2 py-1 bg-gray-300 rounded cursor-pointer ml-3";

  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  const dbRef = ref(db);
  const dispatch = useDispatch();
  const artworksRedux = useSelector((state) => state.artworks);
  const [artworksLocal, setArtworksLocal] = useState([]);
  const currentPage = useSelector((state) => state.activePage.personalGalleryPage)
  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const { user, logged } = useSelector((state) => {
    return state.users;
  });

  useEffect(() => {
    dispatch(clearText());
  }, []);

  const localUpdate = async () => {
    const artworksRef = child(
      dbRef,
      "/users/" + user.personalData.name + "/artworks"
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
          console.error("Artworks data is not in a recognized format");
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

  const handlePageChange = (pageNumber) => {
    dispatch(setPersonalGalleryPage(pageNumber))
    scroll.scrollToTop();
  };

  return (
    <div>
      {logged && (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "550px",
            overflow: "hidden",
          }}
        >
          <img
            src="https://www.lucelight.it/file/fotoblocco-156237.jpg"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(50%)", // Aggiunto l'effetto di penombra
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "2em",
              zIndex: 1,
            }}
          >
            PERSONAL GALLERY
          </div>
        </div>
      )}
      {logged ? (
        <div className="max-w-screen-xl mx-auto flex flex-col items-center relative">
          <ArtGrid artworks={currentItems} />
          <div className="mt-4 flex items-center">
            <button
              className={buttonClass}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <p className="flex items-center px-2 py-1 bg-gray-300 rounded ml-3">{currentPage}</p>
            <button
              className={buttonClass}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastItem >= artworksLocal.length}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
}

export default PersonalGalleryPage;