// Grid.js

import React from 'react';
import CardBox from './CardBox';

function Grid({ museums, openModal }) {
  const containerClass = "flex flex-wrap";
  const cardBoxDiv = "flex-none box-border p-5 md:p-10 lg:p-20 w-1/2";

  return (
    <div className={containerClass}>
      {museums.map((museum) => (
        <div key={museum.id} className={cardBoxDiv} onClick={() => openModal(museum)}>
          <CardBox
            imageUrl={museum.image}
            name={museum.name}
            description={museum.description}
            onClick={() => openModal(museum)}
          />
        </div>
      ))}
    </div>
  );
}

export default Grid;
