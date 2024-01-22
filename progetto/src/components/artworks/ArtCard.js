import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext } from 'react';
import NavigationContext from "../../context/navigation";
import { IoIosClose } from 'react-icons/io';
import { updateArt, setArt } from "../../store";


function ArtCard({ artwork }) {

    const containerClass = "mx-auto col-span-1 max-w-md mx-auto my-8 p-6 bg-white rounded-md lg:col-span-1 e xl:col-span-1 z-auto relative";
    const modalContainerClass = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    const modalDivClass = "bg-white p-8 max-w-md rounded shadow-lg relative";
    const textContainerClass = "mb-4";
    const buttonClass = "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer";
    const closeButtonClass = "absolute top-2 right-2 text-gray-700 cursor-pointer text-lg";

    const artContainer = "w-auto h-md p-6 bg-white-100 border-yellow-200 rounded-lg shadow hover:bg-yellow-800 dark:bg-yellow-800 dark:border-yellow-700 dark:hover:bg-yellow-700"
    const imageClass = "w-full h-60 object-contain lg:object-cover rounded-md";
    const titleClass = "mt-4 text-2xl font-semibold text-center text-gray-800 line-clamp-1";
    const authorClass = "mt-4 text-2xl text-center text-gray-800 line-clamp-1";
    const heartIconClass = "absolute top-4 right-4 m-4";
    const favoriteClass = "favorite text-3xl z-6";


    const { logged, artworks } = useSelector((state) => {
        return state.users;
    })

    const [favoriteState, setFavoriteState] = useState(false);
    const [modal, setModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);
    //const [full, setFull] = useState(false);

    const { navigate } = useContext(NavigationContext);

    const dispatch = useDispatch();

    const handleClickHeart = function (art) {
        if (logged) {
            if (favoriteState) {
                setConfirmModal(!confirmModal);
            } else {
                dispatch(updateArt(artwork));
                setFavoriteState(!favoriteState);
            }
        } else {
            setModal(true);
        }
    }

    const deleteFavorite = function () {
        if (confirmModal) {
            dispatch(updateArt(artwork));
            setConfirmModal(false);
            setFavoriteState(!favoriteState);
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

    /*
    const handleClickArtwork = function () {
        setFull(!full);
    }
    */

    /*
    const openModal = function () {
        setFull(true);
    }

    const closeModal = function () {
        setFull(false);
    }
    */

    const handleClickDetails = function () {
        dispatch(setArt(artwork));
        navigate("/artworkDetails");
    }

    /*
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
                open={openModal}
                onClose={closeModal}
                className="z-50"
            />}
        </div>

    )
    */

    const undoDelete = function () {
        setConfirmModal(false);
    }


    return (
        <div>
            {confirmModal && (
                <div id="popup-modal" className="fixed inset-0 z-50 overflow-auto flex items-center justify-center">
                    <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={undoDelete} type="button" className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this artwork from your favorites?</h3>
                            <button data-modal-hide="popup-modal" type="button" onClick={deleteFavorite} className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                                Yes, I'm sure
                            </button>
                            <button onClick={undoDelete} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                        </div>
                    </div>
                </div>
            )}
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
                <div className={artContainer}>
                    <img src={artwork.image} className={imageClass} onClick={handleClickDetails} />
                    <h2 className={titleClass} onClick={handleClickDetails}>{artwork.title}</h2>
                    <h3 className={authorClass}> {artwork.authorName ? artwork.authorName : "Unknown Author"}
                    </h3>
                </div>
                <div className={heartIconClass}>
                    {favoriteState ? (
                        <FaHeart className={favoriteClass} onClick={() => handleClickHeart(artwork)} />
                    ) : (
                        <FaRegHeart className={favoriteClass} onClick={() => handleClickHeart(artwork)} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ArtCard;
