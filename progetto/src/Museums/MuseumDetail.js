// MuseumDetail.js
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Grid from './Grid';

function MuseumDetail() {





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
          <div>
              <h1 style={{ textAlign: 'center' }}>NOME MUSEO</h1>
          </div>
          <div style={{ 
            background: `url("https://www.area-arch.it/wp-content/uploads/sites/6/2023/10/Keope-Plate_copper.jpg") center/cover no-repeat`, 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            position: 'relative'
        }}>
            <div style={{ 
                position: 'absolute', 
                top: 0, 
                right: 0, 
                bottom: 0, 
                left: 0, 
                backgroundColor: 'rgba(255, 255, 255, 0.7)'
            }}></div>
            <div style={{ 
                position: 'relative', 
                maxWidth: '800px', 
                margin: 'auto', 
                borderRadius: '8px', 
                overflow: 'hidden', 
                zIndex: 1 
            }}>
                <img
                    src="https://www.area-arch.it/wp-content/uploads/sites/6/2023/10/Keope-Plate_copper.jpg"
                    alt="Immagine del museo"
                    style={{ width: '100%', marginBottom: '20px', borderRadius: '8px' }}
                />
                <div style={{ 
                    position: 'absolute', 
                    bottom: '100px', 
                    left: '20px', 
                    color: '#000', 
                    textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
                    zIndex: 2
                }}>
                    <h2>Nome del Museo</h2>
                </div>
                <div style={{ 
                    padding: '20px', 
                    boxSizing: 'border-box', 
                    textAlign: 'left', 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    zIndex: 2 
                }}>
                    <p>
                        Descrizione del museo e altre informazioni
                    </p>
                </div>
            </div>
        </div>


         
  

      </div>
  )
}

export default MuseumDetail;

