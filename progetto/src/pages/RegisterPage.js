import { useDispatch } from "react-redux";
import { registerUser, setLogged } from "../store";
import { useState, useContext } from "react";
import NavigationContext from "../context/navigation";


function RegisterPage() {

    const containerClass = "p-4 max-w-md bg-white rounded-md shadow-md mt-4 mx-auto items-center";
    const mandatoryClass = "text-red-500";
    const successDivClass = "mt-4 p-4 bg-green-100 border border-green-400 text-green-700";
    const successPClass = "mb-1";
    const titleClass = "font-bold text-center text-2xl";
    const formClass = "max-w-md mx-auto bg-white p-8 mt-10 shadow-md";
    const labelClass = "block text-gray-700 text-sm font-bold mb-2";
    const divClass = "mb-4";
    const inputClass = "w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500";
    const buttonClass = "w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue";


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

        dispatch(registerUser({
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
        setSuccess(true);
    };

    return (
        <div className={containerClass}>
            {success && (
                <div className={successDivClass}>
                    <p className={successPClass}><strong>Success:</strong> You have registered correctly!</p>
                </div>
            )}
            <div className={titleClass}>Register</div>
            <form onSubmit={handleSubmit} className={formClass}>
                <div className={divClass}>
                    <label htmlFor="name" className={labelClass}>
                        Name: <span className={mandatoryClass}>*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>
                <div className={divClass}>
                    <label htmlFor="surname" className={labelClass}>
                        Surname: <span className={mandatoryClass}>*</span>
                    </label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>
                <div className={divClass}>
                    <label htmlFor="username" className={labelClass}>
                        Username: <span className={mandatoryClass}>*</span>
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>
                <div className={divClass}>
                    <label htmlFor="password" className={labelClass}>
                        Password: <span className={mandatoryClass}>*</span>
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={inputClass}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={buttonClass}
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
