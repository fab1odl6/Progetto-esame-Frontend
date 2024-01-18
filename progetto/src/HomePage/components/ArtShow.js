import { useDispatch, useSelector } from "react-redux";
import { setArt, switchFullArt } from "../store";
import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import className from "classnames";
import { useEffect, useState, useContext } from "react";
import NavigationContext from "../../context/navigation";


function ArtShow({ favoriteState, onClickHeart, setFavoriteState }) {

    const modalClass = className("fixed inset-0 flex flex-col items-center justify-center w-screen h-screen z-10");
    const container = className("border-slate-300 border-solid border-4 bg-white overflow-auto");
    const imageContainer = className("flex justify-between relative");
    const image = className("max-w-xl max-h-xl");
    const close = className("text-3xl absolute border-1 border-black top-2.5 right-2.5 bg-white place-self-center");
    const firstRow = className("flex justify-between");
    const favorite = className("ml-auto text-2xl");
    const linkClass = className("text-blue-500 hover:underline");
    const buttonClass = className("bg-blue-500 text-white font-bold py-2 px-4 rounded");

    const { navigate } = useContext(NavigationContext);

    const { array, index } = useSelector((state) => {
        return state.artworks;
    })

    const { artworks, logged } = useSelector((state) => {
        return state.users;
    })
    const [modal, setModal] = useState(false);

    const dispatch = useDispatch();

    const handleClickClose = function () {
        dispatch(switchFullArt());
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

    const handleClickButtonDetails = function () {
        dispatch(setArt(array[index]));
        navigate("/artworkDetails");
    }

    return (
        <div className={modalClass}>
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
            <div className={container}>
                <div className={imageContainer}>
                    <img className={image} key={array[index].id} src={array[index].image} alt={array[index].title} />
                    <IoIosClose className={close} onClick={handleClickClose} />
                </div>
                <div className={firstRow}>
                    {array[index].title && <div>Title: {array[index].title}</div>}
                    {favoriteState ? (
                        <FaHeart className={favorite} onClick={() => handleClickHeart(array[index])} />
                    ) : (
                        <FaRegHeart className={favorite} onClick={() => handleClickHeart(array[index])} />
                    )}
                </div>
                {array[index].authorName && <div>Author: {array[index].authorName}</div>}
                {array[index].link && <div>Source Link: <a className={linkClass} href={array[index].link}>{array[index].title}</a></div>}
                {array[index].department && <div>Department: {array[index].department}</div>}
                {array[index].culture && <div>Culture: {array[index].culture}</div>}
                {array[index].date && <div>Date: {array[index].date}</div>}
                {array[index].classification && <div>Classification: {array[index].classification}</div>}
                <div>
                    <button className={buttonClass} onClick={handleClickButtonDetails}>
                        See details
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ArtShow;
