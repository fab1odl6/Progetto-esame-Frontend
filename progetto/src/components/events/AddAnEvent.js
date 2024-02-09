import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";
import { firebaseConfig } from "../firebase/FirebaseConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DepartmentDropdown from "../dropdowns/DepartmentDropdown";
import { useDispatch, useSelector } from "react-redux";
import { addCustomEventUser, addNewEvent, addEventUser } from "../../store";

function AddAnEvent() {
  const addeventboxClass =
    "relative flex flex-col lg:flex-row lg:h-screen lg:items-center larghezza-completa";
  const dimensionboxClass = "w-full lg:w-1/2 p-4 lg:p-12";
  const positiontextClass = "mx-auto max-w-full text-center";
  const titlestyleClass = "text-2xl font-bold sm:text-3xl text-[#444455]";
  const errorstyleClass =
    "mx-auto mb-0 mt-8 max-w-md space-y-4 flex flex-col border-[#77aaff] border-2 rounded p-4 box-border";
  const errortextClass = "w-md bg-red-500 text-[#444455] p-4";
  const textinputClass =
    "w-100 rounded-lg border-blue-200 border-1 p-4 pe-12 text-sm shadow-sm h-10";
  const suggestinputClass = "flex flex-col text-[#444455]";
  const textcolor = "text-[#444455]";
  const redcolorClass = "text-red-500";
  const selectedText = "text-[#77aaff] font-bold";
  const positionbuttonClass = "flex items-center justify-between";
  const stylebuttonClass =
    "inline-block rounded-lg bg-blue-400 px-5 py-3 text-sm font-medium text-white";
  const imgpositionClass = "relative h-64 w-full lg:h-full lg:w-1/2";
  const imgboxClass = "absolute inset-0 h-full w-full object-cover";
  const selectedOptionClass = "mt-2";

  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  const dbRef = ref(db);

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    date: "",
    guests: "",
    image: "",
    name: "",
    department: "",
  });

  const { user, logged, customEvents, events } = useSelector((state) => {
    return state.users;
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [alreadyExistsError, setAlreadyExistsError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [localEvents, setLocalEvents] = useState(customEvents);

  const updateLocal = async function () {
    const eventsRef = child(
      dbRef,
      "/users/" + user.personalData.name + "/customEvents"
    );

    try {
      const snapshot = await get(eventsRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const updatedEvents = [];

        for (const key in data) {
          const event = data[key];
          updatedEvents.push(event);
        }

        setLocalEvents(updatedEvents);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
  };

  const handleChangeDate = function (date) {
    setSelectedDate(date);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (events.find((item) => item.name === formData.name)) {
      setAlreadyExistsError(true);
      setFormData({
        date: "",
        favorite: false,
        full: false,
        guests: "",
        image: "",
        name: "",
      });

      return;
    }

    if (!formData.name || !selectedDate || !formData.image || !selectedOption) {
      setError("Fill the mandatory fields!");
      setSuccess(null);
      return;
    }

    const newEvent = {
      date: selectedDate.toDateString(),
      favorite: true,
      full: false,
      guests: formData.guests,
      id: 4,
      image: formData.image,
      name: formData.name,
      department: selectedOption,
      path: formData.name,
      userGenerated: true,
      generator: user.personalData.name,
    };

    dispatch(addEventUser(newEvent));
    dispatch(addCustomEventUser(newEvent));
    dispatch(addNewEvent(newEvent));

    setFormData({
      date: "",
      favorite: false,
      full: false,
      guests: "",
      image: "",
      name: "",
    });

    setSuccess(true);
    setError(null);
    setSelectedDate(null);
    setSelectedOption(null);
    setAlreadyExistsError(null);

    updateLocal();
  };

  useEffect(() => {
    updateLocal();
  }, [customEvents, logged]);

  return (
    <section className={addeventboxClass}>
      <div className={dimensionboxClass}>
        <div className={positiontextClass}>
          <h1 className={titlestyleClass}>ADD AN EVENT!</h1>
        </div>

        <form onSubmit={handleSubmit} className={errorstyleClass}>
          {alreadyExistsError && (
            <div className={errortextClass}>
              This event already exists, try changing its name!
            </div>
          )}

          <div className={suggestinputClass}>
            <label htmlFor="name">
              Name: <span className={redcolorClass}>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={textinputClass}
              required
              autoComplete="off"
            />
          </div>
          <div className={textcolor}>
            <label htmlFor="image">
              Image URL: <span className={redcolorClass}>*</span>
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={textinputClass}
              required
              autoComplete="off"
            />
          </div>
          <div className={textcolor}>
            <label htmlFor="date" className="inputLabelClass">
              Date: <span className={redcolorClass}>*</span>
            </label>
            <div className="datePickerContainerClass">
              <DatePicker
                showIcon
                toggleCalendarOnIconClick
                id="date"
                name="date"
                value={selectedDate}
                selected={selectedDate}
                onChange={handleChangeDate}
                dateFormat="dd/MM/yyyy"
                className={textinputClass}
                required
                minDate={new Date()}
                autoComplete="off"
              />
            </div>
          </div>
          <div className={textcolor}>
            <div>
              <DepartmentDropdown
                onOptionSelect={handleOptionSelection}
                autoComplete="off"
              />
              {selectedOption && (
                <p className={selectedOptionClass}>
                  <span className={selectedText}>Selected: </span>
                  {selectedOption}
                </p>
              )}
            </div>
          </div>
          <div className={textcolor}>
            <label htmlFor="guests" className="inputLabelClass">
              Guests:
            </label>
            <div>
              <input
                type="text"
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                className={textinputClass}
                autoComplete="off"
              />
            </div>
          </div>
          <div className={positionbuttonClass}>
            <button type="submit" className={stylebuttonClass}>
              Send
            </button>
          </div>
        </form>
      </div>

      <div className={imgpositionClass}>
        <img
          alt="Benvenuto"
          src="https://www.gallerialivorno.it/wp-content/uploads/2022/07/Gabriella-Caverni-Le-ortensie-azzurre.jpg"
          className={imgboxClass}
        />
      </div>
    </section>
  );
}

export default AddAnEvent;
