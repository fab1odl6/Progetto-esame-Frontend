import ArtCard from "./ArtCard";

function ArtGrid({ artworks }) {
    const gridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 z-50 mx-auto p-4 max-w-screen-xl";

    const renderCard = artworks.map((artwork) => (
        <ArtCard key={artwork.id} artwork={artwork} />
    ));

    return (
        <div className={gridClass}>
            {renderCard}
        </div>
    );
}

export default ArtGrid;
