import React from "react";

function CardBox({ imageUrl, name, onClick }) {
  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "110%",
  };

  const textStyle = {
    fontWeight: "bold",
    fontSize: "1.5rem",
    color: "white",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    position: "relative",
    zIndex: 1,
    marginTop: "50%",
  };

  const transparentAreaStyle = {
    position: "absolute",
    bottom: "0",
    left: "0",
    width: "100%",
    height: "2cm", // Altezza dell'area trasparente aumentata
    background: "rgba(205, 127, 50, 0.7)",
    zIndex: 0,
  };

  return (
    <div
      className="relative overflow-hidden aspect-video bg-red-400 cursor-pointer rounded-xl group"
      style={containerStyle}
    >
      <div className="absolute inset-0 flex items-end">
        <div className="w-full p-4" style={textStyle}>
          {name}
        </div>
        <div style={transparentAreaStyle}></div>
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
