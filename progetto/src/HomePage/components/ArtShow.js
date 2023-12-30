import { useDispatch, useSelector } from "react-redux";
import { switchFullArt } from "../store";
import { IoIosClose } from "react-icons/io";


function ArtShow() {

    const { array, index } = useSelector((state) => {
        return state.artworks;
    })

    const dispatch = useDispatch();

    const handleClick = function () {
        dispatch(switchFullArt());
    }

    return (
        <div className="fullShow">
            <IoIosClose className="closeButton" onClick={handleClick} />
            <div>{array[index].name}</div>
            <div>bbb</div>
        </div>
    )
}

export default ArtShow;
