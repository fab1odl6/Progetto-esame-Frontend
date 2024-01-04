// Grid.js
import React from 'react';

function Grid({ museums, openModal }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {museums.map((museum, index) => (
        <div key={museum.id} style={{ flex: '0 0 50%', boxSizing: 'border-box', padding: '5px' }} onClick={() => openModal(museum)}>
          <img src={museum.image} alt={museum.displayName} style={{ width: '100%', borderRadius: '8px' }} />
          <h3>{museum.displayName}</h3>
        </div>
      ))}
    </div>
  );
}

export default Grid;
