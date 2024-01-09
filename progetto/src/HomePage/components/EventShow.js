import { useDispatch, useSelector } from "react-redux";
import { switchFullEvent, switchFavoriteEvent } from "../store";
import { IoIosClose } from "react-icons/io";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import className from "classnames";


function EventShow() {

    const modal = className("fixed inset-0 flex flex-col items-center justify-center w-screen h-screen");
    const container = className("border-slate-300 border-solid border-4 bg-white");
    const imageContainer = className("flex justify-between relative");
    const image = className("max-w-2xl max-h-2xl");
    const close = className("text-3xl absolute border-1 border-black top-2.5 right-2.5 bg-white place-self-center");
    const firstRow = className("flex justify-between");
    const favorite = className("ml-auto text-2xl");

    const { array, index } = useSelector((state) => {
        return state.events;
    })

    const dispatch = useDispatch();

    const handleClickClose = function () {
        dispatch(switchFullEvent());
    }

    const handleClickHeart = function () {
        dispatch(switchFavoriteEvent());
    }

    return (
        <div className={modal}>
            <div className={container}>
                <div className={imageContainer}>
                    <img className={image} key={array[index].id} src={array[index].image} alt={array[index].name} />
                    <IoIosClose className={close} onClick={handleClickClose} />
                </div>
                <div className={firstRow}>
                    {array[index].name && <div>Title: {array[index].name}</div>}
                    {array[index].favorite ? (
                        <FaHeart className={favorite} onClick={handleClickHeart} />
                    ) : (
                        <FaRegHeart className={favorite} onClick={handleClickHeart} />
                    )}
                </div>
                {array[index].place && <div>Place: {array[index].place}</div>}
                {array[index].guests && <div>Guests: {array[index].guests}</div>}
                {array[index].date && <div>Date: {array[index].date}</div>}
            </div>
        </div>
    )

}

export default EventShow;
/*<div className={modal}>
           <div className={firstRow}>
               <div>{array[index].name}</div>
               {array[index].favorite ? (
                   <FaHeart className={favorite} onClick={handleClickHeart} />
               ) : (
                   <FaRegHeart className={favorite} onClick={handleClickHeart} />
               )}
               <IoIosClose className={close} onClick={handleClickClose} />
           </div>
           <div>bbb</div>
       </div>*/