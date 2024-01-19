import { useDispatch, useSelector } from "react-redux";
import className from "classnames";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { onClickHeart, updateArt } from "../HomePage/store";
import { useContext, useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import NavigationContext from "../context/navigation";


function ArtworkDetail() {

    const container = className("items-center bg-white overflow-auto p-4"); // Aggiunto il padding
    const imageContainer = className("flex justify-center items-center relative"); // Centrato l'elemento all'interno
    const image = className("max-w-xl max-h-xl rounded"); // Aggiunto il border-radius
    const firstRow = className("flex justify-between items-center p-2"); // Aggiunto il padding e centrato verticalmente
    const favoriteClass = className("text-2xl cursor-pointer"); // Rimossa la margin-left e cambiato il cursore
    const linkClass = className("text-blue-500 hover:underline");

    const { navigate } = useContext(NavigationContext);

    const { art } = useSelector((state) => {
        return state.artDetails;
    })

    const { user, logged, artworks } = useSelector((state) => {
        return state.users;
    })
    const [modal, setModal] = useState(false);
    const [favoriteState, setFavoriteState] = useState(false);

    const dispatch = useDispatch();

    const handleClickHeart = function () {
        console.log("Logged: " + logged)
        if (logged) {
            dispatch(updateArt(art));
            setModal(false);
            setFavoriteState(!favoriteState);
        } else {
            setModal(true);
        }
    }

    const handleClickButton = function () {
        navigate("/login");
    }

    const handleClickCloseLog = function () {
        setModal(false);
    }

    useEffect(() => {
        if (logged) {
            if (artworks.find((item) => item.id === art.id)) {
                setFavoriteState(true);
            } else {
                setFavoriteState(false);
            }
        }
    }, [logged]);

    console.log("Art in ArtworkDetails: " + art.image)
    return (
        <div className={container}>
            {modal && (
                <div className="z-20 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-8 max-w-md rounded shadow-lg relative">
                        <div className="mb-4">You must login to save an artwork/event!</div>
                        <button onClick={handleClickButton} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                            Login
                        </button>
                        <IoIosClose onClick={handleClickCloseLog} className="absolute top-2 right-2 text-gray-700 cursor-pointer text-lg" />
                    </div>
                </div>
            )}
            <div className={imageContainer}>
                <img className={image} key={art.id} src={art.image} alt={art.title} />
            </div>
            <div className={firstRow}>
                {art.title && <div className="text-lg font-semibold">Title: {art.title}</div>}
                {favoriteState ? (
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