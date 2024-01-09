import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ImageBox from './ImageBox';
import Grid from './Grid';
import { Link } from 'react-router-dom';
import MuseumModal from './MuseumModal';
import className from "classnames";


function Museums() {

  const searchBarHeader = className("justify-center align-center flex");
  const searchBar = className("mt-5 border-1 h-1/6 w-5/6 text-gray-500 justify-between flex");
  const searchIcon = className("self-end mb-6");


  const [museums, setMuseums] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMuseum, setSelectedMuseum] = useState(null);

  useEffect(() => {
    // Fai la chiamata API qui e aggiorna lo stato dei musei
    const fetchData = async () => {
      try {
        const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/departments');
        const data = await response.json();

        // Aggiungo la proprietà image a ciascun oggetto dell'array
        const museumsWithImage = data.departments.map((department) => ({
          ...department,
          image: 'https://www.area-arch.it/wp-content/uploads/sites/6/2023/10/Keope-Plate_copper.jpg',
        }));

        setMuseums(museumsWithImage);
        console.log(museumsWithImage);
      } catch (error) {
        console.error('Error fetching museums:', error);
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

    <div>
      <div className={searchBarHeader}>
        <div className={searchBar}>
          Cerca ...
          <SearchIcon className={searchIcon} />
        </div>
      </div>
      <div className="mainContent" style={{
        background: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("https://www.area-arch.it/wp-content/uploads/sites/6/2023/10/Keope-Plate_copper.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh - 100px)',
      }}>
        <h1 style={{ textAlign: 'center', paddingTop: '50px',  fontWeight: 'bold', fontSize: '2em' }}>MUSEUMS</h1>
        <Grid museums={museums} openModal={openModal} />
        <MuseumModal open={modalOpen} onClose={closeModal} museum={selectedMuseum} />
      </div>
    </div>
  );
}

export default Museums;