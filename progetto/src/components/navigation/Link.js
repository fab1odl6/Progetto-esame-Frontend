import { useDispatch, useSelector } from "react-redux";
import useNavigation from "../../hooks/use-navigation";
import { setPage } from "../../store";


function Link({ to, children, singlePage }) {

    const dispatch = useDispatch();

    const { navigate } = useNavigation();

    const page = useSelector((state) => state.activePage.page);

    const classes = `${singlePage === page ? 'text-green-500' : 'text-red-500'}`;


    const handleClick = (event) => {
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        dispatch(setPage(page));
        event.preventDefault();
        navigate(to);
    }

    return (
        <a className={classes} href={to} onClick={handleClick}>
            {children}
        </a>
    );
}

export default Link;
