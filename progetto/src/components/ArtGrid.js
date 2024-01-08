import ArtCard from "./ArtCard";
import testImage from "../images/test.jpeg";

function ArtGrid() {

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

    const renderCard = artworks.map((artwork) =>{
        return <ArtCard key={artwork.id} artwork={artwork} />;
    })

    return (

        <div>
            <div className="grid grid-cols-4 gap-4">{renderCard}</div>
        </div>
        
    )
}

export default ArtGrid;