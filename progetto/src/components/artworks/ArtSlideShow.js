import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt, updateArt, setArt } from "../../store";
import ArtShow from "./ArtShow";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../firebase/FirebaseConfig";
import { getDatabase } from 'firebase/database';
import { useEffect, useState, useContext } from 'react';
import NavigationContext from '../../context/navigation';
import { IoIosClose } from 'react-icons/io';
import LoginModals from '../modals/loginModals';


function ArtSlideShow() {

    const modalContainerClass = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    const modalDivClass = "bg-white p-8 max-w-md rounded shadow-lg relative";
    const textContainerClass = "mb-4";
    const buttonClass = "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer";
    const closeButtonClass = "absolute top-2 right-2 text-gray-700 cursor-pointer text-lg";
    const artTextClass = "";
    const artDivClass = "";
    const artContainerClass = "mx-auto flex flex-row place-content-center max-w-sm h-96 p-6 bg-yellow-100 border-yellow-200 rounded-lg shadow hover:bg-yellow-800 dark:bg-yellow-800 dark:border-yellow-700 dark:hover:bg-yellow-700";
    const artElementClass = "items-center justify-center mx-auto";
    const imageClass = "max-h-72 cursor-pointer place-self-center";
    const chevronClass = "place-self-center text-2xl";
    const titleAndHeartClass = "flex mt-2";
    const favoriteClass = "ml-auto text-2xl";
    const titleContainerClass = "text-lg";
    const titleClass = "font-bold cursor-pointer";


    const { navigate } = useContext(NavigationContext);

    const { array, index } = useSelector((state) => {
        return state.artworks;
    });

    //const app = initializeApp(firebaseConfig);
    //const db = getDatabase();

    const dispatch = useDispatch();

    const { logged, artworks } = useSelector((state) => {
        return state.users;
    })
    const [favoriteState, setFavoriteState] = useState(false);
    const [modal, setModal] = useState(false);
    //const [full, setFull] = useState(false);

    const handleClickChevronLeft = function () {
        dispatch(swipeLeftArt());
    }

    const handleClickChevronRight = function () {
        dispatch(swipeRightArt());
    }

    const handleClickHeart = function (art) {
        if (logged) {
            dispatch(updateArt(art));
            setFavoriteState(!favoriteState);
            setModal(false);
        } else {
            setModal(true);
        }
    }

    /*
    const handleClickArtwork = function () {
        setFull(!full);
    }
    */

    useEffect(() => {
        if (logged) {
            if (artworks.find((item) => item.id === array[index].id)) {
                setFavoriteState(true);
            } else {
                setFavoriteState(false);
            }
        }
    }, [index, logged]);

    const handleClickButton = function () {
        navigate("/login");
    }

    const handleClickCloseLog = function () {
        setModal(false);
    }

    /*
    const openModal = function () {
        setFull(true);
    }

    const closeModal = function () {
        setFull(false)
    }
    */

    /*
    {full &&
                    <ArtShow
                        artwork={array[index]}
                        favoriteState={favoriteState}
                        onClickHeart={handleClickHeart}
                        setFavoriteState={setFavoriteState}
                        open={openModal}
                        onClose={closeModal}
                    />
                }

                <div className={modalContainerClass}>
                    <div className={modalDivClass}>
                        <div className={textContainerClass}>You must login to save an artwork/event!</div>
                        <button onClick={handleClickButton} className={buttonClass}>
                            Login
                        </button>
                        <IoIosClose onClick={handleClickCloseLog} className={closeButtonClass} />
                    </div>
                </div>

    */

    const handleClickDetails = function (artwork) {
        dispatch(setArt(artwork));
        navigate("/artworkDetails");
    }

    const altText = "Image of " + array[index].title;
    return (
        <div>
            {modal && (
                <LoginModals onClickButton={handleClickButton} onCloseLog={handleClickCloseLog} />
            )}
            <div className={artTextClass}>Highlighted Artworks</div>
            <div className={artDivClass}>
                <div className={artContainerClass}>
                    <FaChevronLeft className={chevronClass + " mr-2 cursor-pointer"} onClick={handleClickChevronLeft} />
                    <div className={artElementClass}>
                        <img className={imageClass} src={array[index].image} alt={altText} onClick={() => handleClickDetails(array[index])} />
                        <div className={titleAndHeartClass}>
                            <div className={titleContainerClass}>
                                <div className={titleClass} onClick={() => handleClickDetails(array[index])}>{array[index].title} </div>
                                {array[index].authorName ? (
                                    <div> {array[index].authorName}</div>
                                ) : (
                                    <div>Unknown Author</div>
                                )}
                            </div>
                            {favoriteState ? (
                                <FaHeart className={favoriteClass} onClick={() => handleClickHeart(array[index])} />
                            ) : (
                                <FaRegHeart className={favoriteClass} onClick={() => handleClickHeart(array[index])} />
                            )}
                        </div>
                    </div>
                    <FaChevronRight className={chevronClass + " ml-2 cursor-pointer"} onClick={handleClickChevronRight} />
                </div>
            </div>
        </div>
    );
}

export default ArtSlideShow;
