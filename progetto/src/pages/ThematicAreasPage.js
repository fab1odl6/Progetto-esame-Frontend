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

function ThematicAreasPage() {
  const containerClass = "mt-4";
  const imageboxClass = "relative w-full h-200px overflow-hidden";
  const textonimageClass =
    "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white font-bold text-2xl z-10";

  const [thematicAreas, setThematicAreas] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedTA, setSelectedTA] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearText());
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        onValue(departmentsRef, (snapshot) => {
          const data = snapshot.val();

          const TAFromFirebase = Object.keys(data).map((key) => ({
            id: key,
            name: data[key].name,
            image: data[key].img,
            description: data[key].description,
          }));

          setThematicAreas(TAFromFirebase);
        });
      } catch (error) {
        console.error("Error fetching thematic areas:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (TA) => {
    setSelectedTA(TA);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedTA(null);
    setModal(false);
  };

  return (
    <div>
      <div className={imageboxClass}>
        <img
          src="https://www.055firenze.it/ridimensiona.html/cms/1920/1080/100_100_100/cms/custom/files/100005/ct50012_id223491_t1/5._Depero._Cavalcata_Fantastica_unimmagine_dellallestimento_Palazzo_Medici_Riccardi_Firenze_Ph._Nicola_Neri.jpeg"
          style={{ maxHeight: "550px", width: "100%", objectFit: "cover" }}
          className="filter brightness-50"
          alt="Artwork"
        />
        <div className={textonimageClass}>THEMATIC AREAS</div>
      </div>
      {/* Sezione con la griglia delle aree tematiche */}
      <div className={containerClass}>
        <div className="mainContent">
          <Grid thematicAreas={thematicAreas} openModal={openModal} />
          <ThematicAreasModal
            open={modal}
            onClose={closeModal}
            thematicArea={selectedTA}
          />
        </div>
      </div>
    </div>
  );
}

export default ThematicAreasPage;
