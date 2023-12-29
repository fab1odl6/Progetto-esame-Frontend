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

    return (
        <div>
            <div className="highlightedArtText">Opere in evidenza</div>
            <div className="highlightedArtDiv">
                <div className="artElement">
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
