import { useSelector } from "react-redux";


function RegisterPage() {

    const { users, logged } = useSelector((state) => {
        return state.users;
    })

    return (
        <div>aaa</div>
    )
}

export default RegisterPage;
