import { useDispatch, useSelector } from "react-redux";
import useNavigation from "../../hooks/use-navigation";
import { setPage } from "../../store";

function Link({ to, children }) {
  const dispatch = useDispatch();

  const { navigate } = useNavigation();

  const page = useSelector((state) => {
    return state.activePage.page;
  });

  const classes = `text-teal-600 ${
    to === page ? "underline underline-offset-2" : ""
  }`;

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }
    event.preventDefault();
    navigate(to);
  };

  return (
    <a className={classes} href={to} onClick={handleClick}>
      {children}
    </a>
  );
}

export default Link;
