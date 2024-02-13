import Link from "../navigation/Link";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store";
import NavigationContext from "../../context/navigation";
import { useContext } from "react";

function HeaderBar() {
  const sectionHeader = "bg-[#99aadd] mt-0 !important";
  const sectionElement =
    "mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between";
  const navLinks = "hidden md:flex items-center gap-6 text-sm";
  const color = "bg-[#77aaff]";
  const loginButton = `rounded-md ${color} px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer`;
  const registerButton =
    "hidden sm:flex rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-[#444455] cursor-pointer";
  const iconClass = "h-8 w-8 mr-2 cursor-pointer";
  const sectioniconClass = "md:flex md:items-center";
  const registerbuttonClass = "hidden sm:flex";
  const buttonClass = "flex items-center gap-4";
  const logoutbuttonClass = "sm:flex sm:gap-4";

  const dispatch = useDispatch();

  const { navigate } = useContext(NavigationContext);

  const links = [
    { label: "HomePage", path: "/" },
    { label: "Every Artwork", path: "/everyArtwork" },
    { label: "Thematic Areas", path: "/thematicAreas" },
    { label: "Personal Gallery", path: "/personalGallery" },
    { label: "My Events", path: "/myEvents" },
    { label: "Handle Events", path: "/handleEvents" },
  ];

  const { user } = useSelector((state) => state.users);

  const handleLogoClick = () => {
    navigate("/");
  };

  const renderedLinks = links.map((link) => (
    <Link key={link.label} to={link.path} singlePage={link.label}>
      {link.label}
    </Link>
  ));

  const handleLogout = function () {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleLogin = function () {
    navigate("/login");
  };

  const handleRegister = function () {
    navigate("/register");
  };

  return (
    <header className={`${sectionHeader} mt-0 mb-0`}>
      <div className={sectionElement}>
        <div className={sectioniconClass}>
          <img
            src="https://cdn.icon-icons.com/icons2/1364/PNG/512/publicmuseumsign_89226.png"
            onClick={handleLogoClick}
            alt="Icon"
            className={iconClass}
            style={{ filter: "brightness(0) invert(1)", color: "#556699" }}
          />
        </div>
        <nav className={navLinks} aria-label="Global">
          {renderedLinks}
        </nav>

        <div className={buttonClass}>
          <div className={logoutbuttonClass}>
            {user && user.personalData ? (
              <>
                <span className="text-[#444455] mt-2">
                  Hi, {user.personalData.username}!
                </span>
                <a className={registerButton} onClick={handleLogout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <a className={loginButton} onClick={handleLogin}>
                  Login
                </a>
                <div className={registerbuttonClass}>
                  <a className={registerButton} onClick={handleRegister}>
                    Register
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderBar;
