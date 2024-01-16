import { useDispatch } from "react-redux";
import { setUser, setLogged } from "../store";
import { useState, useContext } from "react";
import NavigationContext from "../context/navigation";


function RegisterPage() {

    const { navigate } = useContext(NavigationContext);

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        username: '',
        password: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(setUser({
            name: formData.name,
            surname: formData.surname,
            username: formData.username,
            password: formData.password
        }));
        dispatch(setLogged());

        setFormData({
            name: "",
            surname: "",
            username: "",
            password: ""
        });

        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md">
            <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                    Nome:
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="surname" className="block text-gray-700 text-sm font-bold mb-2">
                    Cognome:
                </label>
                <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                    Nome utente:
                </label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                    Password:
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            >
                Registrati
            </button>
        </form>
    );
};


export default RegisterPage;
