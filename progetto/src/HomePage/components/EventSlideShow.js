import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftEvent, swipeRightEvent, switchFavoriteEvent, switchFullEvent, updateEvent } from '../store';
import EventShow from "./EventShow";
import className from "classnames";
import { useState, useEffect } from 'react';

function EventSlideShow() {

    const container = className("overflow: auto");
    const eventText = className("");
    const eventDiv = className("");
    const eventContainer = className("flex flex-row place-content-center");
    const eventElement = className("");
    const image = className("w-full h-auto max-h-96");
    const chevron = className("place-self-center text-2xl");
    const titleAndHeart = className("flex");
    const favorite = className("ml-auto text-2xl");
    const title = className("text-lg place-content-center");


    const { array, index, full } = useSelector((state) => {
        return state.events;
    });

    const { user, logged, events } = useSelector((state) => {
        return state.users;
    })
    const [favoriteState, setFavoriteState] = useState(false);

    const dispatch = useDispatch();

    const handleClickChevronLeft = function () {
        dispatch(swipeLeftEvent());
    }

    const handleClickChevronRight = function () {
        dispatch(swipeRightEvent());
    }

    const handleClickHeart = function (event) {
        dispatch(updateEvent(event));
        dispatch(switchFavoriteEvent({ event, user }));
        setFavoriteState(!favoriteState);
    }

    const handleClickEvent = function () {
        dispatch(switchFullEvent())
    }

    useEffect(() => {
        if (logged) {
            if (events.find((item) => item.name === array[index].name)) {
                setFavoriteState(true);
            } else {
                setFavoriteState(false);
            }
        }
    }, [index, logged]);

    const altText = "Image of " + array[index].name;
    return (
        <div className={container}>
            <div className={eventText}>Eventi in evidenza</div>
            <div className={eventDiv}>
                <div className={eventContainer}>
                    <FaChevronLeft className={chevron} onClick={handleClickChevronLeft} />
                    <div className={eventElement}>
                        <div onClick={handleClickEvent}>
                            <img className={image} src={array[index].image} alt={altText} />
                        </div>
                        <div className={titleAndHeart}>
                            <div className={title} onClick={handleClickEvent}>{array[index].name}</div>
                            {favoriteState ? (
                                <FaHeart className={favorite} onClick={() => handleClickHeart(array[index])} />
                            ) : (
                                <FaRegHeart className={favorite} onClick={() => handleClickHeart(array[index])} />
                            )}
                        </div>
                    </div>
                    <FaChevronRight className={chevron} onClick={handleClickChevronRight} />
                </div>
                {full && <EventShow />}
            </div>
        </div>
    );
}

export default EventSlideShow;
/*
<div>
            <div className={eventText}>Opere in evidenza</div>
            <div className={eventDiv}>
                <div className={eventContainer}>
                    <FaChevronLeft className={chevron} onClick={handleClickChevronLeft} />
                    <div className={eventElement}>
                        <div className={image} onClick={handleClickEvent}>
                            <img src={array[index].image} alt="image" />
                        </div>
                        <div className={titleAndHeart}>
                            <div className={title} onClick={handleClickEvent}>{array[index].name}</div>
                            {array[index].favorite ? (
                                <FaHeart className={favorite} onClick={handleClickHeart} />
                            ) : (
                                <FaRegHeart className={favorite} onClick={handleClickHeart} />
                            )}
                        </div>
                    </div>
                    <FaChevronRight className={chevron} onClick={handleClickChevronRight} />
                    {full && <EventShow />}
                </div>
            </div>
        </div>
        */