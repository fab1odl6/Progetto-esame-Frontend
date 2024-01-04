import { useDispatch, useSelector } from "react-redux";
import { switchFullArt, switchFavoriteArt } from "../store";
import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from 'react-icons/fa';


function ArtShow() {

    const { array, index } = useSelector((state) => {
        return state.artworks;
    })

    const dispatch = useDispatch();

    const handleClickClose = function () {
        dispatch(switchFullArt());
    }

    const handleClickHeart = function () {
        dispatch(switchFavoriteArt());
    }

    console.log(array[index].image)
    return (
        <div className="openedModal">
            <div className="firstRow">
                <img className="imageFullShow" key={array[index].id} src={array[index].image} alt={array[index].title} />
                <div>{array[index].name}</div>
                <IoIosClose className="closeButton" onClick={handleClickClose} />
            </div>
            <div className="firstRow">
                {array[index].title && <div>Title: {array[index].title}</div>}
                {array[index].favorite ? (
                    <FaHeart className="favoriteShow" onClick={handleClickHeart} />
                ) : (
                    <FaRegHeart className="favoriteShow" onClick={handleClickHeart} />
                )}
            </div>
            {array[index].authorName && <div>Author: {array[index].authorName}</div>}
            {array[index].link && <div>Source Link: <a href={array[index].link}>{array[index].title}</a></div>}
            {array[index].department && <div>Department: {array[index].department}</div>}
            {array[index].culture && <div>Culture: {array[index].culture}</div>}
            {array[index].date && <div>Date: {array[index].date}</div>}
            {array[index].classification && <div>Classification: {array[index].classification}</div>}
        </div>
    )
}

export default ArtShow;

/* 
    Ho messo gli '&&' per fare in modo che se un campo è vuoto, non viene proprio mostrato anche se probabilmente 
    la maggior parte delle volte, soprattutto per i primi, quell' 'and' andrà a buon fine.
*/
