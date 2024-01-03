import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ImageBox from './ImageBox';
import Grid from './Grid';
import { Link } from 'react-router-dom';



function Museums() {


    const [museums, setMuseums] = useState([]);

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


    return (

        <div>
            <div className="sectionHeader">
                <div className="sectionElement">Homepage</div>
                <div className="sectionElement">Every Artwork</div>
                <div className="sectionElement">Museums</div>
                <div className="sectionElement">Personal Gallery</div>
                <div className="sectionElement">My Events</div>
            </div>
            <div className="searchBarHeader">
                <div className="searchBar">
                    Cerca ...
                    <SearchIcon className="searchIcon" />
                </div>
            </div>
            <div className="mainContent" style={{ 
                background: 'linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url("https://www.area-arch.it/wp-content/uploads/sites/6/2023/10/Keope-Plate_copper.jpg")', 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 'calc(100vh - 100px)', // Regola l'altezza in base alle tue esigenze
            }}>
                <h1 style={{ textAlign: 'center', paddingTop: '50px' }}>MUSEUMS</h1>
                <Grid museums={museums} />
            </div>
        </div>
    );
}

export default Museums;