import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt, switchFavoriteArt } from './store';

function ArtSlideShow() {

    const { array, index } = useSelector((state) => {
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

    return (
        <div>
            <div className="highlightedArtText">Opere in evidenza</div>
            <div className="highlightedArtDiv">
                <div className="artElement">
                    <FaChevronLeft className="chevronLeft" onClick={handleClickChevronLeft} />
                    {array[index].name}
                    {array[index].favorite ? (
                        <FaHeart className="favorite" onClick={handleClickHeart} />
                    ) : (
                        <FaRegHeart className="favorite" onClick={handleClickHeart} />
                    )}
                    <FaChevronRight className="chevronRight" onClick={handleClickChevronRight} />
                </div>
            </div>
        </div>
    );
}

export default ArtSlideShow;
