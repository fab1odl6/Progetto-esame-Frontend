function ArtCard({artwork}) {

    return (
        <div className="col-span-1 max-w-md mx-auto my-8 p-6 bg-white border border-black rounded-md lg:col-span-1 e xl:col-span-1">
            <img src={artwork.image} className="w-full h-full object-contain md:h-auto lg:object-cover rounded-md"/>
            <h2 className="mt-4 text-2xl font-semibold text-center text-gray-800">{artwork.title}</h2>
            <h3 className="mt-4 text-2xl text-center text-gray-800">{artwork.authorName}</h3>
        </div>
        
    )
}

export default ArtCard;