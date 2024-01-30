import { createContext, useState, useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";
import { setPage, setPreviousPage } from "../store";
import { useDispatch, useSelector } from "react-redux";

const NavigationContext = createContext();

function NavigationProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const dispatch = useDispatch();

  useEffect(() => {
    const handler = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handler);

    return () => {
      window.removeEventListener("popstate", handler);
    };
  }, []);

  const { page } = useSelector((state) => {
    return state.activePage;
  });

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
    dispatch(setPreviousPage(page));
    dispatch(setPage(to));

    scroll.scrollToTop();
  };

  return (
    <NavigationContext.Provider value={{ currentPath, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export { NavigationProvider };
export default NavigationContext;
