// Grid.js
import React from 'react';
import ImageBox from './ImageBox';

function Grid({ museums, openModal }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {museums.map((museum, index) => (
        <div key={museum.id} style={{ flex: '0 0 50%', boxSizing: 'border-box', padding: '5px 10px 20px 10px' }} onClick={() => openModal(museum)}>
          <ImageBox imageUrl={museum.image} museum={museum} />
        </div>
      ))}
    </div>
  );
}

export default Grid;
