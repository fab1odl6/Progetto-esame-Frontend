// CardBox.js

import React from 'react';

function CardBox({ imageUrl, name, onClick }) {
  return (
    <div className="relative overflow-hidden aspect-video bg-red-400 cursor-pointer rounded-xl group">
      <div className="absolute inset-0 flex items-end">
        <div className="w-full p-4 text-white">
          <div className="font-bold">{name}</div>
        </div>
      </div>
      <img
        alt=""
        className="object-cover w-full h-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out"
        src={imageUrl}
        onClick={onClick}
      />
    </div>
  );
}

export default CardBox;
