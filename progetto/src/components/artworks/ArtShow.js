import { useDispatch, useSelector } from "react-redux";
import { setArt } from "../../store";
import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useEffect, useState, useContext } from "react";
import NavigationContext from "../../context/navigation";
import { Dialog, DialogContent } from "@mui/material";
import LoginModals from "../modals/loginModals";


function ArtShow({ artwork, favoriteState, onClickHeart, setFavoriteState, open, onClose }) {

    const modalClass = "fixed inset-0 flex flex-col items-center justify-center w-screen h-screen z-50";
    const containerClass = "border-slate-300 border-solid border-4 bg-white overflow-auto";
    const imageContainerClass = "flex justify-between relative";
    const imageClass = "max-w-xl max-h-xl";
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
                <LoginModals onClickButton={handleClickButton} onCloseLog={handleClickCloseLog} />
            )}
            <Dialog open={open} onClose={onClose}>
                <DialogContent>
                    <div className={containerClass}>
                        <div className={imageContainerClass}>
                            <img className={imageClass} key={artwork.id} src={artwork.image} alt={artwork.title} />
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
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ArtShow;
