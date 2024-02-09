import { useDispatch } from "react-redux";
import { registerUser, setLogged, setUser, clearText } from "../store";
import { useState, useContext, useEffect } from "react";
import NavigationContext from "../context/navigation";

function RegisterPage() {
  const textcolorClass = "text-[#444455]";
  const textClass = `text-2xl font-semibold tracking-wider ${textcolorClass} capitalize dark:text-white`;
  const buttoncolor = "bg-[#77aaff]";
  const registerbuttonClass = `"flex items-center justify-between w-full px-5 py-2.5 text-sm font-medium text-white ${buttoncolor} rounded-md hover: ${buttoncolor} focus:outline-none focus:ring focus:ring-teal-300 focus:ring-opacity-50"`;
  const formtextClass = `block mb-2 text-sm ${textcolorClass}`;
  const sectionClass = "bg-white dark:bg-gray-900";
  const positionClass ="flex justify-center min-h-screen bg-opacity-20 bg-white bg-opacity-20 rounded-lg p-5";
  const imageboxClass = "hidden bg-cover lg:block lg:w-2/5";
  const formClass ="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5";
  const gridformClass = "grid grid-cols-1 gap-6 mt-8 md:grid-cols-2";
  const tipformClass ="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40";

  const { navigate } = useContext(NavigationContext);

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
  };

  return (
    <section className={sectionClass}>
      <div className={positionClass}>
        <div
          className={imageboxClass}
          style={{
            backgroundImage:
              "url('https://www.art-plus.it/wp-content/uploads/CM2165-Claude-Monet-Nymph%C3%A9as-ninfee-water-lilies-impressionismo-impressionism.jpg')",
          }}
        ></div>
        <div className={formClass}>
          <div className="w-full">
            <h1 className={textClass}>Get your free account now!</h1>

            <form className={gridformClass} onSubmit={handleSubmit}>
              <div>
                <label className={formtextClass}>Name</label>
                <input
                  type="text"
                  placeholder="Jhon"
                  className={tipformClass}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className={formtextClass}>Surname</label>
                <input
                  type="text"
                  placeholder="Smith"
                  className={tipformClass}
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className={formtextClass}>Username</label>
                <input
                  type="text"
                  placeholder="jhon.smith"
                  name="username"
                  className={tipformClass}
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className={formtextClass}>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={tipformClass}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className={registerbuttonClass} type="submit">
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
