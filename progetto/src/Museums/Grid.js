// Grid.js
import React from 'react';
import ImageBox from './ImageBox';

const Grid = ({ museums }) => {
  const defaultImageUrl = 'https://www.area-arch.it/wp-content/uploads/sites/6/2023/10/Keope-Plate_copper.jpg';

  return (
    <div className="container">
      <div className="row">
        {museums.map((museum) => (
          <div className="col" key={museum.departmentId}>
            <ImageBox imageUrl={museum.image || defaultImageUrl} department={museum} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
