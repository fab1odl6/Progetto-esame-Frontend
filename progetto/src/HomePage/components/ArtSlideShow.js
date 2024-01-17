import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt, updateArt, setFavorite } from '../store';
import ArtFullShow from "./ArtShow";
import className from "classnames";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../components/FirebaseConfig';
import { getDatabase } from 'firebase/database';
import { useEffect, useState } from 'react';




function ArtSlideShow() {


    const artText = className("");
    const artDiv = className("");
    const artContainer = className("flex flex-row place-content-center");
    const artElement = className("");
    const image = className("w-full h-auto max-h-96");
    const chevron = className("place-self-center text-2xl");
    const titleAndHeart = className("flex");
    const favoriteClass = className("ml-auto text-2xl");
    const title = className("text-lg place-content-center flex justify-between");

    const { array, index, full } = useSelector((state) => {
        return state.artworks;
    });

    const app = initializeApp(firebaseConfig);
    const db = getDatabase();

    const dispatch = useDispatch();

    const { user, logged, artworks } = useSelector((state) => {
        return state.users;
    })
    const [favoriteState, setFavoriteState] = useState(false);

    const getEl = function () {
        const i = artworks.findIndex((e) => {
            return e.title === array[index].title;
        });
        console.log("i: " + i)
        let el;
        if (i === -1) {
            el = array[index];
        } else {
            el = artworks[i];
        }
        console.log("el[i]: " + el.title);
        console.log("El: " + el.favorite);
        return el;
    }
    const [el, setEl] = useState(null);
    console.log(artworks.length)
    useEffect(() => {
        setEl(getEl());
    }, [favoriteState])

    const handleClickChevronLeft = function () {
        dispatch(swipeLeftArt());
    }

    const handleClickChevronRight = function () {
        dispatch(swipeRightArt());
    }

    const handleClickHeart = function (art) {
        dispatch(updateArt(art));
        dispatch(switchFavoriteArt({ art, user }));
        setFavoriteState(!favoriteState);
    }

    const handleClickArtwork = function () {
        dispatch(switchFullArt());
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



    const altText = "Image of " + array[index].title;
    return (
        <div>
            <div className={artText}>Opere in evidenza</div>
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
                                <FaHeart className={favoriteClass} onClick={() => handleClickHeart(el)} />
                            ) : (
                                <FaRegHeart className={favoriteClass} onClick={() => handleClickHeart(el)} />
                            )}
                        </div>
                    </div>
                    <FaChevronRight className={chevron} onClick={handleClickChevronRight} />
                </div>
                {full && <ArtFullShow />}
            </div>
        </div>
    );
}

export default ArtSlideShow;
