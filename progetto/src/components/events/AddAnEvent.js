import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { firebaseConfig } from "../firebase/FirebaseConfig";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DepartmentDropdown from "../dropdowns/DepartmentDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewEvent,
  setCustomEvents,
  updateCustomEvents,
  updateEvent,
} from "../../store";

function AddAnEvent() {
  const containerClass =
    "p-4 w-md h-md overflow-auto border bg-white rounded-md shadow-md mt-4 h-full";
  const errorDivClass =
    "mt-4 p-4 bg-red-100 border border-red-400 text-red-700";
  const errorPClass = "w-48 mb-1 line-clamp-1";
  const successDivClass =
    "mt-4 p-4 bg-green-100 border border-green-400 text-green-700";
  const successPClass = "w-48 mb-1 line-clamp-1";
  const mandatoryClass = "text-red-500";
  const titleClass = "text-lg font-bold mb-4 mt-2 text-center";
  const formClass = "space-y-4";
  const inputContainerClass = "flex flex-col";
  const inputLabelClass = "mb-1";
  const inputClass = "border border-gray-300 rounded-md p-2";
  const buttonClass =
    "bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600";
  const selectedOptionClass =
    "mt-1 w-48 p-2 bg-blue-500 text-white rounded line-clamp-1";
  const datePickerContainerClass = "flex relative items-center";
  const datePickerClass = "w-full p-2 border rounded outline-none";

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

        dispatch(setCustomEvents([...localEvents, ...updatedEvents]));
        setLocalEvents([...localEvents, ...updatedEvents]);
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
    dispatch(updateCustomEvents(newEvent)); // eventi custom dell'utente
    dispatch(addNewEvent(newEvent)); // eventi generali del db
    dispatch(updateEvent(newEvent)); // eventi preferiti dell'utente

    setFormData({
      date: "",
      favorite: false,
      full: false,
      guests: "",
      image: "",
      name: "",
    });

    setSuccess("Great! Your event has been uploaded correctly!");
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
    <div className={containerClass}>
      {alreadyExistsError && (
        <div className="w-md bg-red-500 text-white p-4">
          This event already exists,
          <br />
          try changing its name!
        </div>
      )}
      {error && (
        <div className={errorDivClass}>
          <p className={errorPClass}>
            <strong>Error</strong>{" "}
          </p>
        </div>
      )}
      {success && (
        <div className={successDivClass}>
          <p className={successPClass}>
            <strong>Success</strong>
          </p>
        </div>
      )}
      <h3 className={titleClass}>Add an event!</h3>
      <form className={formClass} onSubmit={handleSubmit}>
        <div className={inputContainerClass}>
          <label htmlFor="name" className={inputLabelClass}>
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
            autoComplete="off"
          />
        </div>
        <div className={inputContainerClass}>
          <label htmlFor="image" className={inputLabelClass}>
            Image URL: <span className={mandatoryClass}>*</span>
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className={inputClass}
            required
            autoComplete="off"
          />
        </div>
        <div className={inputContainerClass}>
          <label htmlFor="date" className={inputLabelClass}>
            Date: <span className={mandatoryClass}>*</span>
          </label>
          <div>
            <div>
              <div className={datePickerContainerClass}>
                <DatePicker
                  showIcon
                  toggleCalendarOnIconClick
                  id="date"
                  name="date"
                  value={selectedDate}
                  selected={selectedDate}
                  onChange={handleChangeDate}
                  dateFormat="dd/MM/yyyy"
                  className={datePickerClass}
                  required
                  minDate={new Date()}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={inputContainerClass}>
          <div>
            <DepartmentDropdown
              onOptionSelect={handleOptionSelection}
              autoComplete="off"
            />
            <span className={mandatoryClass}>*</span>
            {selectedOption && (
              <p className={selectedOptionClass}>{selectedOption}</p>
            )}
          </div>
        </div>
        <div className={inputContainerClass}>
          <label htmlFor="guests" className={inputLabelClass}>
            Guests:
          </label>
          <input
            type="text"
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className={inputClass}
            autoComplete="off"
          />
        </div>
        <button type="submit" className={buttonClass}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddAnEvent;
