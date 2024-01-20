import React from 'react';
import ImageBox from './ImageBox';

function Grid({ museums, openModal }) {

  const containerClass = "flex flex-wrap";
  const imageBoxDiv = "flex-none box-border p-5 md:p-10 lg:p-20 w-1/2";


  return (
    <div className={containerClass}>
      {museums.map((museum) => (
        <div key={museum.id} className={imageBoxDiv} onClick={() => openModal(museum)}>
          <ImageBox imageUrl={museum.image} museum={museum} />
        </div>
      ))}
    </div>
  );
}

export default Grid;
