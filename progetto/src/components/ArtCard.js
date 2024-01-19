import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from 'react';
import { useContext } from "react";
import NavigationContext from "../context/navigation";
import { IoIosClose } from 'react-icons/io';
import ArtShow from "../HomePage/components/ArtShow";
import { switchFullArt, updateArt } from '../HomePage/store';


function ArtCard({ artwork }) {

    //const favorite = className("ml-auto text-2xl");

    const { user, logged, artworks } = useSelector((state) => {
        return state.users;
    })

    const [favoriteState, setFavoriteState] = useState(false);
    const [modal, setModal] = useState(false);

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
        dispatch(switchFullArt());
    }

    return (
        <div className="col-span-1 max-w-md mx-auto my-8 p-6 bg-white border border-black rounded-md lg:col-span-1 e xl:col-span-1 z-6 relative">
            {modal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 max-w-md rounded shadow-lg relative">
                        <div className="mb-4">You must login to save an artwork/event!</div>
                        <button onClick={handleClickButton} className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                            Login
                        </button>
                        <IoIosClose onClick={handleClickClose} className="absolute top-2 right-2 text-gray-700 cursor-pointer text-lg" />
                    </div>
                </div>
            )}
            <img onClick={handleClickArtwork} src={artwork.image} className="w-full h-full object-contain md:h-auto lg:object-cover rounded-md" />
            <h2 className="mt-4 text-2xl font-semibold text-center text-gray-800">{artwork.title}</h2>
            <h3 className="mt-4 text-2xl text-center text-gray-800"> {artwork.authorName ? artwork.authorName : "Author Unknown"}
            </h3>
            <div className="absolute top-0 right-0 m-4">
                {favoriteState ? (
                    <FaHeart className="favorite text-3xl z-6" onClick={() => handleClickHeart(artwork)} />
                ) : (
                    <FaRegHeart className="favorite text-3xl z-6" onClick={() => handleClickHeart(artwork)} />
                )}
            </div>
            {artwork.full && <ArtShow favoriteState={favoriteState} onClickHeart={handleClickHeart} setFavoriteState={setFavoriteState} />}
        </div>

    )
}

export default ArtCard;