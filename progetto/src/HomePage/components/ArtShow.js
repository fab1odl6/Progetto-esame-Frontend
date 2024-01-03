import { useDispatch, useSelector } from "react-redux";
import { switchFullArt, switchFavoriteArt } from "../store";
import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from 'react-icons/fa';


function ArtShow() {

    const { array, index, full } = useSelector((state) => {
        return state.artworks;
    })

    const dispatch = useDispatch();

    const handleClickClose = function () {
        dispatch(switchFullArt());
    }

    const handleClickHeart = function () {
        dispatch(switchFavoriteArt());
    }

    return (
        <div className="open">
            <IoIosClose className="closeButton" onClick={handleClickClose} />
            <div className="firstRow">
                <div>{array[index].name}</div>
                {array[index].favorite ? (
                    <FaHeart className="favoriteShow" onClick={handleClickHeart} />
                ) : (
                    <FaRegHeart className="favoriteShow" onClick={handleClickHeart} />
                )}
            </div>
            <div>bbb</div>
        </div>
    )
}

export default ArtShow;