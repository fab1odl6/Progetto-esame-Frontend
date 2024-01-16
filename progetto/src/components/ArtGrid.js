import ArtCard from "./ArtCard";
import testImage from "../images/test.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { swipeLeftArt, swipeRightArt, switchFavoriteArt, switchFullArt } from '../store';

function ArtGrid({ artworks }) {

    /*
    const { array } = useSelector((state) => {
        return state.artworks;
    });
    */

    /*
    console.log("RISULTATI")
    console.log(array)
    console.log(index)
    console.log(full)
    */

    //console.log(artworks)

    /*
    const artworks = [
        { image: testImage, title: "Titolo 1", id: "1"},
        { image: testImage, title: "Titolo 2", id: "2"},
        { image: testImage, title: "Titolo 3", id: "3"},
        { image: testImage, title: "Titolo 4", id: "4"},
        { image: testImage, title: "Titolo 5", id: "5"},
        { image: testImage, title: "Titolo 6", id: "6"},
        { image: testImage, title: "Titolo 7", id: "7"},
        { image: testImage, title: "Titolo 8", id: "8"},
    ];
    */

    
    const renderCard = artworks.map((artwork) =>{
        //console.log("TITOLO")
        //console.log(artwork.title)
        return <ArtCard key={artwork.id} artwork={artwork} />
    })

    /*
    const renderCard = artworks.map((artwork) =>{
        return <ArtCard key={artwork.id} artwork={artwork} />;
    })
    */

    return (
        <div>
            <div className="grid grid-cols-4 gap-4">{renderCard}</div>
        </div>  
    )
}

export default ArtGrid;