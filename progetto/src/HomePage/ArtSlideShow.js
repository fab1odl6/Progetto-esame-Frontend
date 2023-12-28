import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import { useState } from "react";
import { useEffect } from "react";


function ArtSlideShow() {

    const [artIndex, setArtIndex] = useState(0);

    var artArray = ["opera 1", "opera 2", "opera 3", "opera 4", "opera 5"];

    const handleClickChevronLeft = function () {
        if (artIndex == 5) {
            setArtIndex(0);
        } else {
            setArtIndex(artIndex + 1);
        }
    }

    useEffect(() => {
        handleClickChevronLeft();
    }, []);

    const handleClickChevronRight = function () {
        if (artIndex == 0) {
            setArtIndex(5)
        }
        else {
            setArtIndex(artIndex - 1);
        }
    }

    useEffect(() => {
        handleClickChevronRight();
    }, []);

    return (
        <div>
            <div className="highlightedArtText">Opere in evidenza</div>
            <div className="highlightedArtDiv">
                <div className="artElement">
                    <FaChevronLeft className="chevronLeft" onClick={handleClickChevronLeft()} />
                    {artArray[artIndex]}
                    <FavoriteBorder className="favoriteBorder" />
                    <FaChevronRight className="chevronRight" onClick={handleClickChevronRight()} />
                </div>
            </div>
        </div>
    )
}

export default ArtSlideShow;