import React, { useState, useEffect } from "react";
import Grid from "../components/thematic areas/Grid";
import ThematicAreasModal from "../components/thematic areas/ThematicAreasModal";
import { firebaseConfig } from "../components/firebase/FirebaseConfig";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { useDispatch } from "react-redux";
import { clearText } from "../store";

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const departmentsRef = ref(database, "/departments");

function Museums() {
  const containerClass = "mt-4";

  const [museums, setMuseums] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMuseum, setSelectedMuseum] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearText());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        onValue(departmentsRef, (snapshot) => {
          const data = snapshot.val();

          const museumsFromFirebase = Object.keys(data).map((key) => ({
            id: key,
            name: data[key].name,
            image: data[key].img,
            description: data[key].description,
          }));

          setMuseums(museumsFromFirebase);
        });
      } catch (error) {
        console.error("Error fetching museums:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (museum) => {
    setSelectedMuseum(museum);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMuseum(null);
    setModalOpen(false);
  };

  return (
    <div className={containerClass}>
      {/* Sezione con l'immagine */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "500px",
          overflow: "hidden",
        }}
      >
        <img
          src="https://www.055firenze.it/ridimensiona.html/cms/1920/1080/100_100_100/cms/custom/files/100005/ct50012_id223491_t1/5._Depero._Cavalcata_Fantastica_unimmagine_dellallestimento_Palazzo_Medici_Riccardi_Firenze_Ph._Nicola_Neri.jpeg"
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
          THEMATIC AREAS
        </div>
      </div>

      {/* Sezione con la griglia delle aree tematiche */}
      <div className="mainContent">
        <Grid museums={museums} openModal={openModal} />
        <ThematicAreasModal
          open={modalOpen}
          onClose={closeModal}
          museum={selectedMuseum}
        />
      </div>
    </div>
  );
}

export default Museums;