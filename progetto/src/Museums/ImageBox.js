
// ImageBox.js
import React from 'react';

const ImageBox = ({ imageUrl, museum }) => {
  console.log('imageUrl:', imageUrl);
  console.log('department:', museum);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    margin: '0',
    padding: '0',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0', // Bordi superiori stondati
  };

  const descriptionStyle = {
    position: 'absolute',
    bottom: '0',
    left: '0',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  return (
    <div className="box is-inline-block" style={containerStyle}>
      <img src={imageUrl} alt="Immagine" style={imageStyle} />
      {museum && <div style={descriptionStyle}>{museum.name}</div>}
    </div>
  );
};

export default ImageBox;
