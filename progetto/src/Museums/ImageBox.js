// ImageBox.js
import React from 'react';
import { Link } from 'react-router-dom';

const ImageBox = ({ imageUrl, description }) => {
<<<<<<< HEAD
  const containerStyle = {
    position: 'relative',
    width: '500px',
    height: '500px',
    overflow: 'hidden',
    margin: '0',
    padding: '0',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const descriptionStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.8)', // Aggiungi un background leggermente trasparente per migliorare la leggibilità
    padding: '10px',
  };

  return (
    <div className="box is-inline-block" style={containerStyle}>
      <img src={imageUrl} alt="Immagine" style={imageStyle} />
      {description && <div style={descriptionStyle}>{description}</div>}
    </div>
  );
};



=======
    const containerStyle = {
      position: 'relative',
      width: '500px',
      height: '500px',
      overflow: 'hidden',
      margin: '0',
      padding: '0',
    };
  
    const imageStyle = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    };
  
    const descriptionStyle = {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
      background: 'rgba(255, 255, 255, 0.8)', // Aggiungi un background leggermente trasparente per migliorare la leggibilità
      padding: '10px',
    };
  
    return (
      <div className="box is-inline-block" style={containerStyle}>
        <img src={imageUrl} alt="Immagine" style={imageStyle} />
        {description && <div style={descriptionStyle}>{description}</div>}
      </div>
    );
  };
  
  
  
>>>>>>> 732f68ff7ef9d4d496bcdff6fb4ab46644985b54

export default ImageBox;