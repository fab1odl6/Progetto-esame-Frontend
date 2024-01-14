import { useDispatch, useSelector } from "react-redux";
import { switchFullArt, switchFavoriteArt } from "../store";
import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import className from "classnames";

function ArtShow() {

    const modal = className("fixed inset-0 flex flex-col items-center justify-center w-screen h-screen z-10");
    const container = className("border-slate-300 border-solid border-4 bg-white overflow-auto");
    const imageContainer = className("flex justify-between relative");
    const image = className("max-w-xl max-h-xl");
    const close = className("text-3xl absolute border-1 border-black top-2.5 right-2.5 bg-white place-self-center");
    const firstRow = className("flex justify-between");
    const favorite = className("ml-auto text-2xl");
    const buttonClass = className("bg-blue-500 text-white font-bold py-2 px-4 rounded");

    const { array, index } = useSelector((state) => {
        return state.artworks;
    })

    const dispatch = useDispatch();

    const handleClickClose = function () {
        dispatch(switchFullArt());
    }

    const handleClickHeart = function (art) {
        dispatch(switchFavoriteArt(art));
    }

    const handleClickButton = function () {

    }

    return (
        <div className={modal}>
            <div className={container}>
                <div className={imageContainer}>
                    <img className={image} key={array[index].id} src={array[index].image} alt={array[index].title} />
                    <IoIosClose className={close} onClick={handleClickClose} />
                </div>
                <div className={firstRow}>
                    {array[index].title && <div>Title: {array[index].title}</div>}
                    {array[index].favorite ? (
                        <FaHeart className={favorite} onClick={() => handleClickHeart(array[index])} />
                    ) : (
                        <FaRegHeart className={favorite} onClick={() => handleClickHeart(array[index])} />
                    )}
                </div>
                {array[index].authorName && <div>Author: {array[index].authorName}</div>}
                {array[index].link && <div>Source Link: <a href={array[index].link}>{array[index].title}</a></div>}
                {array[index].department && <div>Department: {array[index].department}</div>}
                {array[index].culture && <div>Culture: {array[index].culture}</div>}
                {array[index].date && <div>Date: {array[index].date}</div>}
                {array[index].classification && <div>Classification: {array[index].classification}</div>}
                <button className={buttonClass} onClick={handleClickButton}>
                    See details
                </button>
            </div>
        </div>
    )
}

export default ArtShow;

/* 
    Ho messo gli '&&' per fare in modo che se un campo è vuoto, non viene proprio mostrato anche se probabilmente 
    la maggior parte delle volte, soprattutto per i primi, quell' 'and' andrà a buon fine.
*/
