import { React, useContext } from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import NavigationContext from "../../context/navigation";

function Footer() {
  const bgcolor = "bg-[#334466]";
  const footerStyle = `${bgcolor} text-white py-10 mt-0`;
  const containerStyle = "max-w-7xl mx-auto flex justify-between flex-wrap";
  const sectionStyle = "flex-1 mb-10";
  const marginRightStyle = "mr-10";
  const textClass = "text-3xl mb-6";
  const linkContainerClass = "text-2xl mb-6";
  const linkClass = "text-gray-300 text-lg mb-2 block cursor-pointer";
  const h3Class = "text-2xl mb-6";
  const mb4Class = "mb-4";
  const mb8Class = "mb-8";
  const borderRightStyle = "border-r border-white";
  const centerText = "text-center mt-10";
  const socialIconsContainerClass = "list-none p-0 flex";
  const liClass = "mr-4";
  const iconLinkClass = "text-white text-3xl";
  const footerContainerStyle = "mt-10";

  const { navigate } = useContext(NavigationContext);

  const handleClickEveryArtwork = function () {
    navigate("/everyArtwork");
  };

  const handleClickHomePage = function () {
    navigate("/");
  };

  const handleClickThematicAreas = function () {
    navigate("/thematicAreas");
  };

  return (
    <footer className={`${footerStyle} ${footerContainerStyle}`}>
      <div className={containerStyle}>
        <div className={`${sectionStyle} ${marginRightStyle} mb-12`}>
          <h2 className={textClass}>WELCOME TO OUR VIRTUAL MUSEUM</h2>
          <p>
            Explore a world where each artwork tells a unique story. Discover
            art that inspires, captivates, and connects. Thank you for joining
            us on this artistic journey.
          </p>
        </div>

        <div className={`${sectionStyle} ${linkContainerClass} ml-12 mb-16`}>
          <h3 className={linkContainerClass}>QUICK LINKS</h3>
          <ul>
            <li>
              <a onClick={handleClickEveryArtwork} className={linkClass}>
                Permanent Collection
              </a>
            </li>
            <li>
              <a onClick={handleClickHomePage} className={linkClass}>
                Events and Initiatives
              </a>
            </li>
            <li>
              <a onClick={handleClickThematicAreas} className={linkClass}>
                Themathic Areas
              </a>
            </li>
          </ul>
        </div>

        <div className={`${sectionStyle} ${borderRightStyle}`}>
          <h3 className={h3Class}>CONTACT US</h3>
          <p className={mb4Class}>
            <strong>Musuem Address:</strong>
          </p>
          <p className={mb8Class}>info@artreasures.it</p>
          <p className={mb4Class}>
            <strong>Phone Number:</strong>
          </p>
          <p>0749 367519</p>
        </div>

        <div className={`${sectionStyle} ml-4`}>
          <h3 className={h3Class}>FOLLOW US</h3>
          <ul className={socialIconsContainerClass}>
            <li className={liClass}>
              <a
                href="https://www.facebook.com/?locale=it_IT"
                className={iconLinkClass}
              >
                <FaFacebook />
              </a>
            </li>
            <li className={liClass}>
              <a href="https://www.instagram.com/" className={iconLinkClass}>
                <FaInstagram />
              </a>
            </li>
            <li className={liClass}>
              <a href="https://twitter.com/?lang=it" className={iconLinkClass}>
                <FaTwitter />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={centerText}>
        <p>&copy; 2024 Art Treasures. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
