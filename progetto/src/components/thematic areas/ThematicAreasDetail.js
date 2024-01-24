import React, { useState } from "react";

function MuseumDetail({ museum }) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  return (
    <div>
      <div>
        <h1
          style={{
            textAlign: "center",
            fontSize: "2.5em",
            fontWeight: "bold",
            marginTop: "20px",
            color: "#333",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          THEMATIC AREA DETAILS
        </h1>
      </div>
      <div
        style={{
          background: `url("https://www.area-arch.it/wp-content/uploads/sites/6/2023/10/Keope-Plate_copper.jpg") center/cover no-repeat`,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
          }}
        ></div>
        <div
          style={{
            position: "relative",
            maxWidth: "800px",
            margin: "auto",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "800px",
              margin: "auto",
              borderRadius: "12px",
              overflow: "hidden",
              zIndex: 1,
            }}
          >
            <img
              src={museum.image}
              alt="Immagine del museo"
              style={{
                width: "100%",
                marginBottom: "20px",
                borderRadius: "12px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "5%",
                left: "5%",
                color: "#fff",
                textShadow: "4px 4px 8px rgba(0, 0, 0, 0.7)",
                zIndex: 2,
              }}
            >
              <h2 style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                {museum.name}
              </h2>
            </div>
          </div>

          <div
            style={{
              padding: "20px",
              boxSizing: "border-box",
              textAlign: "left",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              zIndex: 2,
              borderTopLeftRadius: "12px",
              borderTopRightRadius: "12px",
            }}
          >
            <p>
              {showFullDescription
                ? museum.description
                : museum.description?.slice(0, 700) + " ..."}
            </p>
            {museum.description && museum.description.length > 700 && (
              <button
                onClick={toggleDescription}
                className="middle none center mr-3 rounded-lg py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                style={{
                  background: 'linear-gradient(to right, #c29467, #c29467)',
                  border: 'none', // Remove border if needed
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

export default MuseumDetail;
