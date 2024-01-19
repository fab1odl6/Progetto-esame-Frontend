import React from 'react';


function ImageBox({ imageUrl, museum }) {
  console.log('imageUrl:', imageUrl);
  console.log('department:', museum);

  const containerClass = "relative w-full h-full overflow-hidden m-0 p-0 box inline-block";
  const imageClass = "w-full h-full object-cover rounded-t-md";
  const descriptionClass = "absolute bottom-0 left-0 w-full bg-white bg-opacity-80 p-4 text-center font-bold";


  return (
    <div className={containerClass}>
      <img src={imageUrl} alt="Image" className={imageClass} />
      {museum && <div className={descriptionClass}>{museum.name}</div>}
    </div>
  );
};

export default ImageBox;
