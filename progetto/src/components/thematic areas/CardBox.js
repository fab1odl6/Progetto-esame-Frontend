import React from "react";

function CardBox({ imageUrl, name, onClick }) {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "110%",
  };
  const textStyle = "w-full p-4 font-bold text-2xl text-#444455 text-shadow-lg relative z-10";
  const transparentAreaStyle ="absolute bottom-0 left-0 w-full h-16 bg-opacity-80 bg-gray-300 z-0 pb-4 pointer-events-none"; // Applica "pointer-events: none;" qui
  const backgroundcontainer = "relative overflow-hidden aspect-video bg-red-400 cursor-pointer rounded-xl group";
  const textClass = "absolute inset-0 flex items-end";
  const imageboxClass = "object-cover w-full h-full aspect-square group-hover:scale-110 transition duration-300 ease-in-out";


  return (
    <div
      className={backgroundcontainer}
      style={containerStyle}
    >
      <img
        alt=""
        className={imageboxClass}
        src={imageUrl}
        onClick={onClick}
      />
      <div className={textClass}>
        <div className={textStyle}>
          {name}
        </div>
        <div className={transparentAreaStyle}></div>
      </div>
    </div>
  );
}

export default CardBox;
