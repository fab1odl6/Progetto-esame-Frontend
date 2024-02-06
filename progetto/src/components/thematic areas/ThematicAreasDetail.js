import React, { useState } from "react";

function ThematicAreasDetail({ thematicArea }) {
  const bgbuttoncolor = "bg-[#77aaff]";
  const titleboxClass = "text-center";
  const titleClass = `text-4xl font-bold mt-20 text-[#444455] text-shadow-md`;
  const contentboxClass = "min-h-screen flex flex-col items-center relative";
  const boxdepartementnameClass =
    "absolute top-0 right-0 bottom-0 left-0 bg-white bg-opacity-70";
  const boximageClass =
    "relative max-w-[800px] mx-auto rounded-lg overflow-hidden shadow-md z-1";
  const descriptionboxClass =
    "relative max-w-[800px] mx-auto rounded-lg overflow-hidden z-1";
  const imageClass = "w-full mb-8 rounded-lg shadow-md";
  const departmentnameClass =
    "absolute bottom-20 left-5 text-white text-shadow-md z-2";
  const departmentnametextClass = "text-2xl font-bold";
  const descriptioClass =
    "p-5 box-border text-left bg-opacity-90 bg-white z-10 rounded-tl-lg rounded-tr-lg text-[#444455] mt-[-5%]";
  const buttonClass = `middle none center mr-3 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md ${bgbuttoncolor} transition-all hover:shadow-lg hover:${bgbuttoncolor} active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`;

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div>
      <div className={titleboxClass}>
        <h1 className={titleClass}>THEMATIC AREA DETAILS</h1>
      </div>
      <div className={contentboxClass}>
        <div className={boxdepartementnameClass}></div>
        <div className={boximageClass}>
          <div className={descriptionboxClass}>
            <img
              src={thematicArea.image}
              alt="Immagine del museo"
              className={imageClass}
            />

            <div className={departmentnameClass}>
              <h2 className={departmentnametextClass}>{thematicArea.name}</h2>
            </div>
          </div>

          <div className={descriptioClass}>
            <p>
              {showFullDescription
                ? thematicArea.description
                : thematicArea.description?.slice(0, 700) + " ..."}
            </p>
            {thematicArea.description &&
              thematicArea.description.length > 700 && (
                <button
                  onClick={toggleDescription}
                  className={buttonClass}
                  style={{
                    marginTop: "20px",
                  }}
                >
                  {showFullDescription ? "Read Less ↑" : "Read More ↓"}
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThematicAreasDetail;
