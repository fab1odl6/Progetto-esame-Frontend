import Link from "./Link";

function HeaderBar() {
    const links = [
        { label: "HomePage", path: "/" },
        { label: "Musems", path: "/Museums/Museums" }
    ]

    const renderedLinks = links.map((link, index) => {
        return (
            <Link key={index} to={link.path}>
                {link.label}
            </Link>
        )
    })

    return (
        <div className="sectionHeader">
            {renderedLinks}
        </div>
    )
};

export default HeaderBar;
