/* import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useContext } from 'react';
import NavigationContext from "../../context/navigation";
import { updateArt, setArt } from "../../store";
import LoginModals from '../modals/loginModals';
import ConfirmModal from '../modals/ConfirmModal';


function ArtCard({ artwork }) {

    const containerClass = "mx-auto col-span-1 max-w-md mx-auto my-8 p-6 bg-white rounded-md lg:col-span-1 e xl:col-span-1 z-auto relative";
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

    const handleClickDetails = function () {
        dispatch(setArt(artwork));
        navigate("/artworkDetails");
    }

    const undoDelete = function () {
        setConfirmModal(false);
    }

    return (
        <div>
            {confirmModal && (
                <ConfirmModal onDelete={undoDelete} onUndo={deleteFavorite} />
            )}
            <div className={containerClass}>
                {modal && (
                    <LoginModals onClickButton={handleClickButton} onCloseLog={handleClickClose} />
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

*/

import React, { useContext, useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import NavigationContext from "../../context/navigation";
import { updateArt, setArt } from "../../store";
import LoginModals from '../modals/loginModals';
import ConfirmModal from '../modals/ConfirmModal';

const ArtCard = ({ artwork }) => {
    const containerClass = "relative flex items-center justify-center h-60 w-79.5 rounded-xl shadow-xl ring-gray-900/5 mx-auto my-8 group mb-1";
    const artContainer = "z-10 h-full w-full overflow-hidden rounded-xl border border-gray-200 opacity-80 transition duration-300 ease-in-out group-hover:opacity-100 dark:border-gray-700 dark:opacity-70";
    const imageClass = "animate-fade-in block h-full w-full scale-100 transform object-cover object-center opacity-100 transition duration-300 group-hover:scale-110";
    const textContainer = "absolute bottom-0 left-0 p-3 w-full text-white z-30 ";
    const titleClass = "font-serif text-lg font-bold text-white-700 shadow-md shadow-black-100 shadow-opacity-90";
    const subtitleClass = "text-sm font-light text-white-700 shadow-md shadow-black-100 ";
    const heartIconClass = "absolute -top-4 -right-4 m-4 z-20 cursor-pointer";
    const favoriteClass = "favorite text-2xl z-6";
    const textStyle = {
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
        position: 'relative',
      };


    const { logged, artworks } = useSelector((state) => {
        return state.users;
    })

    const [favoriteState, setFavoriteState] = useState(false);
    const [modal, setModal] = useState(false);
    const [confirmModal, setConfirmModal] = useState(false);

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

    const handleClickDetails = function () {
        dispatch(setArt(artwork));
        navigate("/artworkDetails");
    }

    const undoDelete = function () {
        setConfirmModal(false);
    }

    return (
        <div>
            {confirmModal && (
                <ConfirmModal onDelete={undoDelete} onUndo={deleteFavorite} />
            )}
            <div className={containerClass}>
                {modal && (
                    <LoginModals onClickButton={handleClickButton} onCloseLog={handleClickClose} />
                )}
                <div className={artContainer}>
                    <img src={artwork.image} className={imageClass} onClick={handleClickDetails} />
                </div>
                <div className={textContainer}>
                    <h1 className={titleClass} style={textStyle} onClick={handleClickDetails}>{artwork.title}</h1>
                    <h1 className={subtitleClass} style={textStyle}> {artwork.authorName ? artwork.authorName : "Unknown Author"}</h1>
                </div>
                <div className={heartIconClass}>
                    {favoriteState ? (
                        <FaHeart className={`${favoriteClass} text-red-500`} onClick={() => handleClickHeart(artwork)} />
                    ) : (
                        <FaRegHeart className={`${favoriteClass} text-red-500`} onClick={() => handleClickHeart(artwork)} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default ArtCard;
