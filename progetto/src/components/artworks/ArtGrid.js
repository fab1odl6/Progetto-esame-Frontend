import ArtCard from "./ArtCard";


function ArtGrid({ artworks }) {

    const gridClass = "grid grid-cols-4 gap-4 z-50";

    const renderCard = artworks.map((artwork) => {
        return <ArtCard key={artwork.id} artwork={artwork} />
    })

    return (
        <div>
            <div className={gridClass}>{renderCard}</div>
        </div>
    )
}

export default ArtGrid;
