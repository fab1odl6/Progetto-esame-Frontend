import Link from "./Link";

function HeaderBar() {
    const links = [
        { label: "HomePage", path: "/" },
        { label: "EveryArtwork", path: "/everyArtwork" },
        { label: "Musems", path: "/museums" },
        { label: "PersonalGallery", path: "/personalGallery" },
        { label: "MyEvents", path: "/myEvents" }
    ]

    const renderedLinks = links.map((link) => {
        return (
            <div className="sectionElement">
                <Link key={link.label} to={link.path}>
                    {link.label}
                </Link>
            </div>
        );
    });

    return (
        <div className="sectionHeader">
            {renderedLinks}
        </div>
    );
}

export default HeaderBar;
