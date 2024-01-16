import { useDispatch } from "react-redux";
import { setUser, setLogged } from "../store";
import { useState, useContext } from "react";
import NavigationContext from "../context/navigation";
import className from "classnames";


function RegisterPage() {

    const containerClass = className("p-4 max-w-md bg-white rounded-md shadow-md mt-4 mx-auto");
    const mandatoryClass = className("text-red-500");
    const successDivClass = className("mt-4 p-4 bg-green-100 border border-green-400 text-green-700");
    const successPClass = className("mb-1");

    const { navigate } = useContext(NavigationContext);

    const [success, setSuccess] = useState(null);
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

        if (!formData.name || !formData.surname || !formData.username || !formData.password) {
            setSuccess(null);
            return;
        }

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

        // navigate("/");
        setSuccess(true);
    };

    return (
        <div className={containerClass}>
            {success && (
                <div className={successDivClass}>
                    <p className={successPClass}><strong>Success:</strong> You have registered correctly!</p>
                </div>
            )}
            <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 mt-10 shadow-md">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                        Nome: <span className={mandatoryClass}>*</span>
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
                        Cognome: <span className={mandatoryClass}>*</span>
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
                        Nome utente: <span className={mandatoryClass}>*</span>
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
                        Password: <span className={mandatoryClass}>*</span>
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
        </div>
    );
};


export default RegisterPage;
