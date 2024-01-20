import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useContext } from "react";
import NavigationContext from "../../context/navigation";
import { IoIosClose } from 'react-icons/io';
import ArtShow from "./ArtShow";
import { updateArt } from "../../store";


function ArtCard({ artwork }) {

    const containerClass = "col-span-1 max-w-md mx-auto my-8 p-6 bg-white border border-black rounded-md lg:col-span-1 e xl:col-span-1 z-auto relative";
    const modalContainerClass = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    const modalDivClass = "bg-white p-8 max-w-md rounded shadow-lg relative";
    const textContainerClass = "mb-4";
    const buttonClass = "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer";
    const closeButtonClass = "absolute top-2 right-2 text-gray-700 cursor-pointer text-lg";
    const imageClass = "w-full h-full object-contain md:h-auto lg:object-cover rounded-md";
    const titleClass = "mt-4 text-2xl font-semibold text-center text-gray-800";
    const authorClass = "mt-4 text-2xl text-center text-gray-800";
    const heartIconClass = "absolute top-0 right-0 m-4";
    const favoriteClass = "favorite text-3xl z-6";


    const { logged, artworks } = useSelector((state) => {
        return state.users;
    })

    const [favoriteState, setFavoriteState] = useState(false);
    const [modal, setModal] = useState(false);
    const [full, setFull] = useState(false);

    const { navigate } = useContext(NavigationContext);

    const dispatch = useDispatch();

    const handleClickHeart = function (art) {
        if (logged) {
            dispatch(updateArt(art));
            setFavoriteState(!favoriteState);
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

    const handleClickClose = function () {
        setModal(false);
    }

    const handleClickArtwork = function () {
        setFull(!full);
    }

    return (
        <div className={containerClass}>
            {modal && (
                <div className={modalContainerClass}>
                    <div className={modalDivClass}>
                        <div className={textContainerClass}>You must login to save an artwork/event!</div>
                        <button onClick={handleClickButton} className={buttonClass}>
                            Login
                        </button>
                        <IoIosClose onClick={handleClickClose} className={closeButtonClass} />
                    </div>
                </div>
            )}
            <div onClick={handleClickArtwork}>
                <img src={artwork.image} className={imageClass} />
                <h2 className={titleClass}>{artwork.title}</h2>
                <h3 className={authorClass}> {artwork.authorName ? artwork.authorName : "Author Unknown"}
                </h3>
            </div>
            <div className={heartIconClass}>
                {favoriteState ? (
                    <FaHeart className={favoriteClass} onClick={() => handleClickHeart(artwork)} />
                ) : (
                    <FaRegHeart className={favoriteClass} onClick={() => handleClickHeart(artwork)} />
                )}
            </div>
            {full && <ArtShow
                artwork={artwork}
                favoriteState={favoriteState}
                onClickHeart={handleClickHeart}
                setFavoriteState={setFavoriteState}
                setFull={handleClickArtwork}
                className="z-50"
            />}
        </div>

    )
}

export default ArtCard;
