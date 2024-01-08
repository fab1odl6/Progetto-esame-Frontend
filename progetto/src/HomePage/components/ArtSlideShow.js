import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt } from '../store';
import ArtShow from "./ArtShow";
import className from "classnames";


function ArtSlideShow() {

    const artText = className("");
    const artDiv = className("");
    const artContainer = className("flex flex-row place-content-center");
    const artElement = className("");
    const image = className("w-full h-auto max-h-96");
    const chevron = className("place-self-center text-2xl");
    const titleAndHeart = className("flex");
    const favorite = className("ml-auto text-2xl");
    const title = className("text-lg place-content-center");

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


    const altText = "Image of " + array[index].title;
    return (
        <div>
            <div className={artText}>Opere in evidenza</div>
            <div className={artDiv}>
                <div className={artContainer}>
                    <FaChevronLeft className={chevron} onClick={handleClickChevronLeft} />
                    <div className={artElement}>
                        <div onClick={handleClickArtwork}>
                            <img className={image} src={array[index].image} alt={altText} />
                        </div>
                        <div className={titleAndHeart}>
                            <div className={title}>{array[index].title}</div>
                            {array[index].favorite ? (
                                <FaHeart className={favorite} onClick={handleClickHeart} />
                            ) : (
                                <FaRegHeart className={favorite} onClick={handleClickHeart} />
                            )}
                        </div>
                    </div>
                    <FaChevronRight className={chevron} onClick={handleClickChevronRight} />
                </div>
                {full && <ArtShow />}
            </div>
        </div>
    );
}

export default ArtSlideShow;
