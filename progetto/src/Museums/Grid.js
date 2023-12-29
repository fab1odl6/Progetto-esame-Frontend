import React from 'react';
import ImageBox from './ImageBox';

const Grid = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <ImageBox
            imageUrl="https://artemagazine.it/wp-content/uploads/2021/03/3d625aff669e61e0cc2394078fe7b5b7.jpg"
            description= "Primo Museo"
          />
        </div>
        <div className="col">
          <ImageBox
            imageUrl="https://lirp.cdn-website.com/03826007/dms3rep/multi/opt/museo+di+palazzo+reale+genova-640w.JPG"
            description = "Secondo Museo"
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ImageBox
            imageUrl="https://www.museocanonica.it/sites/default/files/f_immagine/Backtonature_Mimmo%20Paladino%2C%20Senza%20titolo%20%28Bandiera%20per%20Villa%20Borghese%29%2C%202020%20cm%20120x120.jpg"
            description = "Terzo Museo Museo"
          />
        </div>
        <div className="col">
          <ImageBox
            imageUrl="https://www.area-arch.it/wp-content/uploads/sites/6/2023/10/Keope-Plate_copper.jpg"
            description = "Quarto Museo"
          />
        </div>
      </div>
    </div>
  );
};

export default Grid;
