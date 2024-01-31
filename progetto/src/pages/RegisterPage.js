import { useDispatch } from "react-redux";
import { registerUser, setLogged, setUser, clearText } from "../store";
import { useState, useContext, useEffect } from "react";
import NavigationContext from "../context/navigation";

function RegisterPage() {
  const containerClass =
    "p-4 max-w-md bg-white rounded-md shadow-md mt-4 mx-auto items-center";
  const mandatoryClass = "text-red-500";
  const successDivClass =
    "mt-4 p-4 bg-green-100 border border-green-400 text-green-700";
  const successPClass = "mb-1";
  const titleClass = "font-bold text-center text-2xl";
  const formClass = "max-w-md mx-auto bg-white p-8 mt-10 shadow-md";
  const labelClass = "block text-gray-700 text-sm font-bold mb-2";
  const divClass = "mb-4";
  const inputClass =
    "w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500";
  const buttonClass =
    "w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue";

  const { navigate } = useContext(NavigationContext);

  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    username: "",
    password: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearText());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.surname ||
      !formData.username ||
      !formData.password
    ) {
      setSuccess(null);
      return;
    }

    dispatch(
      registerUser({
        name: formData.name,
        surname: formData.surname,
        username: formData.username,
        password: formData.password,
      })
    );
    dispatch(
      setUser({
        matchedUser: {
          personalData: {
            name: formData.name,
            surname: formData.surname,
            username: formData.username,
            password: formData.password,
          },
        },
        artworks: [],
        events: [],
        customEvents: [],
      })
    );
    dispatch(setLogged(true));

    setFormData({
      name: "",
      surname: "",
      username: "",
      password: "",
    });

    navigate("/");
    setSuccess(true);
  };

  const wrapperStyle = {
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
    padding: "20px",
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="flex justify-center min-h-screen" style={wrapperStyle}>
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              "url('https://i0.wp.com/orizzontecultura.com/wp-content/uploads/2021/02/Gustave-Klimt-Il-bacio.jpg?resize=726%2C1024&ssl=1')",
          }}
        ></div>
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
              Get your free account now.
            </h1>

            <form
              className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
              onSubmit={handleSubmit}
            >
              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Mario"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Surname
                </label>
                <input
                  type="text"
                  placeholder="Rossi"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="mario.rossi"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                className="flex items-center justify-between w-full px-5 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-50"
                type="submit"
              >
                <span>Sign In</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
