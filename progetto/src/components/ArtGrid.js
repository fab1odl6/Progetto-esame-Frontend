import ArtCard from "./ArtCard";


function ArtGrid({ artworks }) {

    const renderCard = artworks.map((artwork) => {
        return <ArtCard key={artwork.id} artwork={artwork} />
    })

    return (
        <div>
            <div className="grid grid-cols-4 gap-4">{renderCard}</div>
        </div>
    )
}

export default ArtGrid;