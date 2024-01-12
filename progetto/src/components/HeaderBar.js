import Link from "./Link";
import className from "classnames";

function HeaderBar() {

    const sectionHeader = className("flex justify-center mt-10");
    const sectionElement = className("border p-2.5");

    const links = [
        { label: "HomePage", path: "/" },
        { label: "Every Artwork", path: "/everyArtwork" },
        { label: "Museums", path: "/museums" },
        { label: "Personal Gallery", path: "/personalGallery" },
        { label: "My Events", path: "/myEvents" },
        { label: "Handle Events", path: "/handleEvents" }
    ]

    const renderedLinks = links.map((link) => {
        return (
            <div className={sectionElement}>
                <Link key={link.label} to={link.path}>
                    {link.label}
                </Link>
            </div>
        );
    });

    return (
        <div className={sectionHeader}>
            {renderedLinks}
        </div>
    );
}

export default HeaderBar;
