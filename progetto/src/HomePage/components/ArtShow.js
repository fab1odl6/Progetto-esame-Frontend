import { useDispatch, useSelector } from "react-redux";
import { setArt } from "../store";
import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useEffect, useState, useContext } from "react";
import NavigationContext from "../../context/navigation";


function ArtShow({ artwork, favoriteState, onClickHeart, setFavoriteState, setFull }) {

    const modalClass = "fixed inset-0 flex flex-col items-center justify-center w-screen h-screen z-50";
    const modalContainerClass = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    const modalDivClass = "bg-white p-8 max-w-md rounded shadow-lg relative";
    const textContainerClass = "mb-4";
    const buttonClass = "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer";
    const closeButtonClass = "absolute top-2 right-2 text-gray-700 cursor-pointer text-lg";
    const containerClass = "border-slate-300 border-solid border-4 bg-white overflow-auto";
    const imageContainerClass = "flex justify-between relative";
    const imageClass = "max-w-xl max-h-xl";
    const closeIconClass = "text-3xl absolute border-1 border-black top-2.5 right-2.5 bg-white place-self-center";
    const firstRowClass = "flex justify-between";
    const favoriteClass = "ml-auto text-2xl";
    const linkClass = "text-blue-500 hover:underline";
    const buttonDetailsClass = "bg-blue-500 text-white font-bold py-2 px-4 rounded";


    const { navigate } = useContext(NavigationContext);

    const { artworks, logged } = useSelector((state) => {
        return state.users;
    })
    const [modal, setModal] = useState(false);

    const dispatch = useDispatch();

    const handleClickClose = function () {
        setFull();
    }

    const handleClickHeart = function (art) {
        if (logged) {
            onClickHeart(art);
        } else {
            setModal(true);
        }
    }


    useEffect(() => {
        if (logged) {
            if (artworks.find((item) => item.id === artwork.id)) {
                setFavoriteState(true);
            } else {
                setFavoriteState(false);
            }
        }
    }, [logged]);

    const handleClickButton = function () {
        navigate("/login");
    }

    const handleClickCloseLog = function () {
        setModal(false);
    }

    const handleClickButtonDetails = function () {
        dispatch(setArt(artwork));
        navigate("/artworkDetails");
    }


    return (
        <div className={modalClass}>
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
            <div className={containerClass}>
                <div className={imageContainerClass}>
                    <img className={imageClass} key={artwork.id} src={artwork.image} alt={artwork.title} />
                    <IoIosClose className={closeIconClass} onClick={handleClickClose} />
                </div>
                <div className={firstRowClass}>
                    {artwork.title && <div>Title: {artwork.title}</div>}
                    {favoriteState ? (
                        <FaHeart className={favoriteClass} onClick={() => handleClickHeart(artwork)} />
                    ) : (
                        <FaRegHeart className={favoriteClass} onClick={() => handleClickHeart(artwork)} />
                    )}
                </div>
                {artwork.authorName && <div>Author: {artwork.authorName}</div>}
                {artwork.link && <div>Source Link: <a className={linkClass} href={artwork.link}>{artwork.title}</a></div>}
                {artwork.department && <div>Department: {artwork.department}</div>}
                {artwork.culture && <div>Culture: {artwork.culture}</div>}
                {artwork.date && <div>Date: {artwork.date}</div>}
                {artwork.classification && <div>Classification: {artwork.classification}</div>}
                <div>
                    <button className={buttonDetailsClass} onClick={handleClickButtonDetails}>
                        See details
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ArtShow;
