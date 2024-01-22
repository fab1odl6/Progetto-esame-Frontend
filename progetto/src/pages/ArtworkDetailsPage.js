import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { updateArt, setFavorite } from "../store";
import { useContext, useState, useEffect } from "react";
import { IoIosClose } from "react-icons/io";
import NavigationContext from "../context/navigation";


function ArtworkDetailsPage() {

    const containerClass = "items-center bg-white overflow-auto p-4";
    const modalContainerClass = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    const modalDivClass = "bg-white p-8 max-w-md rounded shadow-lg relative";
    const textContainerClass = "mb-4";
    const buttonClass = "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer";
    const closeButtonClass = "absolute top-2 right-2 text-gray-700 cursor-pointer text-lg";
    const imageContainerClass = "flex justify-center items-center relative";
    const titleClass = "text-lg font-semibold";
    const imageClass = "max-w-xl max-h-xl rounded";
    const firstRowClass = "flex justify-between items-center p-2";
    const favoriteClass = "text-2xl cursor-pointer";
    const linkClass = "text-blue-500 hover:underline";

    const { navigate } = useContext(NavigationContext);

    const { art, favoriteState } = useSelector((state) => {
        return state.artDetails;
    })

    const { logged, artworks } = useSelector((state) => {
        return state.users;
    })
    const [modal, setModal] = useState(false);

    const dispatch = useDispatch();

    const handleClickHeart = function () {
        console.log("Logged: " + logged)
        if (logged) {
            dispatch(updateArt(art));
            setModal(false);
            dispatch(setFavorite(!favoriteState));
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
                dispatch(setFavorite(true));
            } else {
                dispatch(setFavorite(false));
            }
        }
    }, [logged, artworks]);

    console.log("Art in ArtworkDetails: " + art.image)
    return (
        <div className={containerClass}>
            {modal && (
                <div className={modalContainerClass}>
                    <div className={modalDivClass}>
                        <div className={textContainerClass}>You must login to save an artwork/event!</div>
                        <button onClick={handleClickButton} className={buttonClass}>
                            Login
                        </button>
                        <IoIosClose onClick={handleClickCloseLog} className={closeButtonClass} />
                    </div>
                </div>
            )}
            <div className={imageContainerClass}>
                <img className={imageClass} key={art.id} src={art.image} alt={art.title} />
            </div>
            <div className={firstRowClass}>
                {art.title && <div className={titleClass}>Title: {art.title}</div>}
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

export default ArtworkDetailsPage;