import React from "react";
import CardBox from "./CardBox";

function Grid({ thematicAreas, openModal }) {
  const containerClass = "flex flex-wrap";
  const cardBoxDiv = "flex-none box-border p-5 md:p-10 lg:p-20 w-1/2";

  return (
    <div className={containerClass}>
      {thematicAreas.map((thematicAreas) => (
        <div
          key={thematicAreas.id}
          className={cardBoxDiv}
          onClick={() => openModal(thematicAreas)}
        >
          <CardBox
            imageUrl={thematicAreas.image}
            name={thematicAreas.name}
            description={thematicAreas.description}
            onClick={() => openModal(thematicAreas)}
          />
        </div>
      ))}
    </div>
  );
}

export default Grid;
