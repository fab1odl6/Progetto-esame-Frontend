import { useDispatch, useSelector } from "react-redux";
import className from "classnames";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { onClickHeart } from "../HomePage/store";


function ArtworkDetail() {

    const container = className("items-center bg-white overflow-auto p-4"); // Aggiunto il padding
    const imageContainer = className("flex justify-center items-center relative"); // Centrato l'elemento all'interno
    const image = className("max-w-xl max-h-xl rounded"); // Aggiunto il border-radius
    const firstRow = className("flex justify-between items-center p-2"); // Aggiunto il padding e centrato verticalmente
    const favoriteClass = className("text-2xl cursor-pointer"); // Rimossa la margin-left e cambiato il cursore
    const linkClass = className("text-blue-500 hover:underline");

    const { art } = useSelector((state) => {
        return state.artDetails;
    })

    const dispatch = useDispatch();

    const handleClickHeart = function () {
        dispatch(onClickHeart(art));
    }


    return (
        <div className={container}>
            <div className={imageContainer}>
                <img className={image} key={art.id} src={art.image} alt={art.title} />
            </div>
            <div className={firstRow}>
                {art.title && <div className="text-lg font-semibold">Title: {art.title}</div>}
                {art.favorite ? (
                    <FaHeart className={favoriteClass} onClick={handleClickHeart} />
                ) : (
                    <FaRegHeart className={favoriteClass} onClick={handleClickHeart} />
                )}
            </div>
            {art.authorName && <div>Author: {art.authorName}</div>}
            {art.link && <div>Source Link: <a className={linkClass} href={art.link}>{art.title}</a></div>}
            {art.department && <div>Department: {art.department}</div>}
            {art.culture && <div>Culture: {art.culture}</div>}
            {art.date && <div>Date: {art.date}</div>}
            {art.classification && <div>Classification: {art.classification}</div>}
        </div>
    )
}

export default ArtworkDetail;