import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt } from '../store';
import ArtShow from "./ArtShow";

function ArtSlideShow() {

    const { array, index, full } = useSelector((state) => {
        return state.artworks;
    });

    const dispatch = useDispatch();

    const handleClickChevronLeft = function () {
        dispatch(swipeLeftArt());
    }

    const handleClickChevronRight = function () {
        dispatch(swipeRightArt());
    }

    const handleClickHeart = function () {
        dispatch(switchFavoriteArt());
    }

    const handleClickArtwork = function () {
        dispatch(switchFullArt());
    }


    return (
        <div>
            <div className="highlightedArtText">Opere in evidenza</div>
            <div className="highlightedArtDiv">
                <div className="artElement">
                    <FaChevronLeft className="chevronLeft" onClick={handleClickChevronLeft} />
                    <div onClick={handleClickArtwork}>
                        {array[index].image}
                    </div>
                    <div>
                        {array[index].favorite ? (
                            <FaHeart className="favorite" onClick={handleClickHeart} />
                        ) : (
                            <FaRegHeart className="favorite" onClick={handleClickHeart} />
                        )}
                    </div>
                    <FaChevronRight className="chevronRight" onClick={handleClickChevronRight} />
                </div>
                {full && <ArtShow />}
            </div>
        </div>
    );
}

export default ArtSlideShow;
