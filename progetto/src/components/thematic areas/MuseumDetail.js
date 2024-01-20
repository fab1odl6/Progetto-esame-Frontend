import React from 'react';


function MuseumDetail({ museum }) {

  return (
    <div>
      <div>
        <h1 style={{ textAlign: 'center', fontSize: '2em', fontWeight: 'bold' }}>THEMATIC AREA DETAILS</h1>
      </div>
      <div
        style={{
          background: `url("https://www.area-arch.it/wp-content/uploads/sites/6/2023/10/Keope-Plate_copper.jpg") center/cover no-repeat`,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }}
        ></div>
        <div
          style={{
            position: 'relative',
            maxWidth: '800px',
            margin: 'auto',
            borderRadius: '8px',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: 'relative', // Importante per rendere la posizione dell'elemento figlio relativa all'immagine
              maxWidth: '800px', // Larghezza massima dell'immagine, da personalizzare
              margin: 'auto', // Per centrare l'immagine
            }}
          >
            <img
              src={museum.image}
              alt="Immagine del museo"
              style={{ width: '100%', marginBottom: '20px', borderRadius: '8px' }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '5%', // Distanza dalla parte inferiore in percentuale
                left: '5%',   // Distanza dalla parte sinistra in percentuale
                color: '#fff', // Colore del testo
                textShadow: '4px 4px 8px rgba(0, 0, 0, 0.7)', // Ombra del testo con valori aumentati
                zIndex: 2,
              }}
            >
              <h2 style={{ fontSize: '1.5em', fontWeight: 'bold' }}>{museum.name}</h2>
            </div>
          </div>


          <div
            style={{
              padding: '20px',
              boxSizing: 'border-box',
              textAlign: 'left',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 2,
            }}
          >
            <p>{museum.description ?? "Descrizione non disponibile"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MuseumDetail;

