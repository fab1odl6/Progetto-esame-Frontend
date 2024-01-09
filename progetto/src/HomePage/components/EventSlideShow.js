import { FaChevronLeft, FaChevronRight, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftEvent, swipeRightEvent, switchFavoriteEvent, switchFullEvent } from '../store';
import EventShow from "./EventShow";
import className from "classnames";

function EventSlideShow() {

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

    const dispatch = useDispatch();

    const handleClickChevronLeft = function () {
        dispatch(swipeLeftEvent());
    }

    const handleClickChevronRight = function () {
        dispatch(swipeRightEvent());
    }

    const handleClickHeart = function () {
        dispatch(switchFavoriteEvent());
    }

    const handleClickEvent = function () {
        dispatch(switchFullEvent())
    }


    const altText = "Image of " + array[index].name;
    return (
        <div>
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
                            {array[index].favorite ? (
                                <FaHeart className={favorite} onClick={handleClickHeart} />
                            ) : (
                                <FaRegHeart className={favorite} onClick={handleClickHeart} />
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