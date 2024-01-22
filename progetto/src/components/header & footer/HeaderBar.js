import Link from "../navigation/Link";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, setPage } from "../../store";
import NavigationContext from "../../context/navigation";
import { useContext, useEffect, useState } from "react";

function HeaderBar() {

  const sectionHeader = "bg-white";
  const sectionElement = "mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between";
  const navLinks = "hidden md:flex items-center gap-6 text-sm";
  const mobileMenuButton = "block md:hidden rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75";
  const loginButton = "rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow";
  const registerButton = "hidden sm:flex rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600";


  const dispatch = useDispatch();

  const { navigate } = useContext(NavigationContext);

  const links = [
    { label: "HomePage", path: "/" },
    { label: "Every Artwork", path: "/everyArtwork" },
    { label: "Thematic Areas", path: "/museums" },
    { label: "Personal Gallery", path: "/personalGallery" },
    { label: "My Events", path: "/myEvents" },
    { label: "Handle Events", path: "/handleEvents" },
  ];

  const { user, logged } = useSelector((state) => state.users);

  const handleLogoClick = () => {
    navigate('/');
  };


  const renderedLinks = links.map((link) => (
    <Link
      key={link.label}
      to={link.path}
      singlePage={link.label}
    >
      {link.label}
    </Link >
  ));

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };


  return (
    <header className={sectionHeader}>
      <div className={sectionElement}>
        <div className="md:flex md:items-center md:gap-12" onClick={() => navigate('/')}>
          <img src="https://cdn.icon-icons.com/icons2/1364/PNG/512/publicmuseumsign_89226.png" alt="Icona" className="h-8 w-8 mr-2" />
          <Link to="/" className="block text-teal-600">
            <span className="sr-only">Home</span>
            <svg className="h-8" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            </svg>
          </Link>
        </div>

        <nav className={navLinks} aria-label="Global">
          {renderedLinks}
        </nav>

        <div className="flex items-center gap-4">
          <div className="sm:flex sm:gap-4">
            {user && user.personalData ? (
              <>
                <a className={loginButton} href="#">
                  {user.personalData.username}
                </a>
                <a className={registerButton} onClick={handleLogout} href="#">
                  Logout
                </a>
              </>
            ) : (
              <>
                <a className={loginButton} href="http://localhost:3000/login">
                  Login
                </a>
                <div className="hidden sm:flex">
                  <a className={registerButton} href="http://localhost:3000/register">
                    Register
                  </a>
                </div>
              </>
            )}
          </div>

          <div className="block md:hidden">
            <button className={mobileMenuButton}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderBar;
