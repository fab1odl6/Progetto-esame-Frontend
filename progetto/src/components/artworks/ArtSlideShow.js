import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt, updateArt } from "../../store";
import ArtShow from "./ArtShow";
import className from "classnames";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from "../firebase/FirebaseConfig";
import { getDatabase } from 'firebase/database';
import { useEffect, useState, useContext } from 'react';
import NavigationContext from '../../context/navigation';
import { IoIosClose } from 'react-icons/io';
import { Dialog, DialogContent } from '@mui/material';


function ArtSlideShow() {

    const modalContainerClass = "fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50";
    const modalDivClass = "bg-white p-8 max-w-md rounded shadow-lg relative";
    const textContainerClass = "mb-4";
    const buttonClass = "bg-blue-500 text-white px-4 py-2 rounded cursor-pointer";
    const closeButtonClass = "absolute top-2 right-2 text-gray-700 cursor-pointer text-lg";
    const artText = className("");
    const artDiv = className("");
    const artContainer = className("flex flex-row place-content-center");
    const artElement = className("");
    const image = className("w-full h-auto max-h-96");
    const chevron = className("place-self-center text-2xl");
    const titleAndHeart = className("flex");
    const favoriteClass = className("ml-auto text-2xl");
    const title = className("text-lg place-content-center flex justify-between");


    const { navigate } = useContext(NavigationContext);

    const { array, index } = useSelector((state) => {
        return state.artworks;
    });

    const app = initializeApp(firebaseConfig);
    const db = getDatabase();

    const dispatch = useDispatch();

    const { logged, artworks } = useSelector((state) => {
        return state.users;
    })
    const [favoriteState, setFavoriteState] = useState(false);
    const [modal, setModal] = useState(false);
    const [full, setFull] = useState(false);

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

    const handleClickArtwork = function () {
        setFull(!full);
    }

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

    const openModal = function () {
        setFull(true);
    }

    const closeModal = function () {
        setFull(false)
    }

    const altText = "Image of " + array[index].title;
    return (
        <div>
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
            <div className={artText}>Highlighted Artworks</div>
            <div className={artDiv}>
                <div className={artContainer}>
                    <FaChevronLeft className={chevron} onClick={handleClickChevronLeft} />
                    <div className={artElement}>
                        <div onClick={handleClickArtwork}>
                            <img className={image} src={array[index].image} alt={altText} />
                        </div>
                        <div className={titleAndHeart}>
                            <div className={title}>
                                <div className='pr-1'>{array[index].title} </div> {array[index].authorName && <div> - {array[index].authorName}</div>}
                            </div>
                            {favoriteState ? (
                                <FaHeart className={favoriteClass} onClick={() => handleClickHeart(array[index])} />
                            ) : (
                                <FaRegHeart className={favoriteClass} onClick={() => handleClickHeart(array[index])} />
                            )}
                        </div>
                    </div>
                    <FaChevronRight className={chevron} onClick={handleClickChevronRight} />
                </div>
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
            </div>
        </div>
    );
}

export default ArtSlideShow;
