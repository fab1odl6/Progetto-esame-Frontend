/* Grid.js
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

*/

// Grid.js
import React from 'react';
import ImageBox from './ImageBox';

function Grid({ museums, openModal }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {museums.map((museum, index) => (
        <div key={museum.id} style={{ flex: '0 0 50%', boxSizing: 'border-box', padding: '5px 10px 20px 10px' }} onClick={() => openModal(museum)}>
          <ImageBox imageUrl={museum.image} department={museum} />
        </div>
      ))}
    </div>
  );
}

export default Grid;
