import ArtCard from "./ArtCard";
import testImage from "../images/test.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt } from '../store';

function ArtGrid({ artworks }) {

    const renderCard = artworks.map((artwork) =>{
        return <ArtCard key={artwork.id} artwork={artwork} />
    })

    return (
        <div>
            <div className="grid grid-cols-4 gap-4">{renderCard}</div>
        </div>  
    )
}

export default ArtGrid;