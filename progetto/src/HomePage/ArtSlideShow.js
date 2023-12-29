<<<<<<< HEAD
import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useState } from 'react';

function ArtSlideShow() {

    let artArray = [
        {
            name: "opera 1",
            favorite: false
        },
        {
            name: "opera 2",
            favorite: false
        },
        {
            name: "opera 3",
            favorite: false
        },
        {
            name: "opera 4",
            favorite: false
        },
        {
            name: "opera 5",
            favorite: false
        }
    ];

    const [artIndex, setArtIndex] = useState(0);
    const [artArrayState, setArtArrayState] = useState(artArray);

    const handleClickChevronLeft = () => {
        setArtIndex((prevIndex) => (prevIndex === 0 ? artArrayState.length - 1 : prevIndex - 1));
    };

    const handleClickChevronRight = () => {
        setArtIndex((prevIndex) => (prevIndex === artArrayState.length - 1 ? 0 : prevIndex + 1));
    };

    const handleClickHeart = function () {
        const updated = artArrayState.map((el, i) => {
            if (i === artIndex) {
                return {
                    ...el,
                    favorite: !el.favorite
                };
            } else {
                return el;
            }
        })

        setArtArrayState(updated);
    }

=======
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

>>>>>>> 732f68ff7ef9d4d496bcdff6fb4ab46644985b54
    return (
        <div>
            <div className="highlightedArtText">Opere in evidenza</div>
            <div className="highlightedArtDiv">
                <div className="artElement">
<<<<<<< HEAD
                    <FaChevronLeft className="chevronLeft" onClick={handleClickChevronLeft} />
                    {artArrayState.length > 0 && (
                        <>
                            {artArrayState[artIndex].name}
                            {artArrayState[artIndex].favorite ? (
                                <FaHeart className="favorite" onClick={handleClickHeart} />
                            ) : (
                                <FaRegHeart className="favorite" onClick={handleClickHeart} />
                            )}
                        </>
                    )}
                    <FaChevronRight className="chevronRight" onClick={handleClickChevronRight} />
                </div>
            </div>
        </div>
    );
}

export default ArtSlideShow;
=======
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
>>>>>>> 732f68ff7ef9d4d496bcdff6fb4ab46644985b54
