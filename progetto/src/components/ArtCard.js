import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { switchFullArt, switchFavoriteArt } from "../store";
import className from "classnames";
import { useState } from 'react';

function ArtCard({artwork}) {

    const favorite = className("ml-auto text-2xl");

    const [isFavorite, setIsFavorite] = useState(false);

    const dispatch = useDispatch();

    const handleClickHeart = function (art) {
        dispatch(switchFavoriteArt(art));
        setIsFavorite(!isFavorite);
    }

    return (
        <div className="col-span-1 max-w-md mx-auto my-8 p-6 bg-white border border-black rounded-md lg:col-span-1 e xl:col-span-1 relative">
            <img src={artwork.image} className="w-full h-full object-contain md:h-auto lg:object-cover rounded-md"/>
            <h2 className="mt-4 text-2xl font-semibold text-center text-gray-800">{artwork.title}</h2>
            <h3 className="mt-4 text-2xl text-center text-gray-800">{artwork.authorName}</h3>
            <div className="absolute top-0 right-0 m-4">
                {isFavorite ? (
                    <FaHeart className="favorite text-3xl" onClick={() => handleClickHeart(artwork)} />
                    ) : (
                    <FaRegHeart className="favorite text-3xl" onClick={() => handleClickHeart(artwork)} />
                )}
            </div>
        </div>
        
    )
}

export default ArtCard;