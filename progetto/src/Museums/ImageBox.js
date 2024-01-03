// ImageBox.js
import React from 'react';

const ImageBox = ({ imageUrl, department }) => {
  console.log('imageUrl:', imageUrl);
  console.log('department:', department);

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
    background: 'rgba(255, 255, 255, 0.8)',
    padding: '10px',
  };

  return (
    <div className="box is-inline-block" style={containerStyle}>
      <img
        src={imageUrl}
        alt="Immagine"
        style={imageStyle}
      />
      {department && <div style={descriptionStyle}>{department.displayName}</div>}
    </div>
  );
};

export default ImageBox;
