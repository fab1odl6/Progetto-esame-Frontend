import { useDispatch, useSelector } from "react-redux";
import { setUser, setLogged } from "../store/index";


function RegisterPage() {

    const { user, logged } = useSelector((state) => (state.users));

    const dispatch = useDispatch();
    dispatch(setUser({ name: "aaa" }));

    console.log("user: " + user + ", logged:" + logged)
    return (
        <div>aaa</div>
    )
}

export default RegisterPage;
