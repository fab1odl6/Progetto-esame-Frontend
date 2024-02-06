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
   <section className="relative flex flex-col lg:flex-row lg:h-screen lg:items-center larghezza-completa">
      <div className="w-full lg:w-1/2 p-4 lg:p-12">
        <div className="mx-auto max-w-full text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-[#444455]">ADD AN EVENT!</h1>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4 flex flex-col">
          {alreadyExistsError && (
            <div className="w-md bg-red-500 text-[#444455] p-4">
              Questo evento esiste già, prova a cambiarne il nome!
            </div>
          )}

          <div className="flex flex-col text-[#444455]">
            <label htmlFor="name">Nome: <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-4/5 rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              required
              autoComplete="off"
            />
          </div>


          <div className="text-[#444455]">
            <label htmlFor="image">URL dell'immagine: <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              required
              autoComplete="off"
            />
          </div>
          <div className="text-[#444455]">
            <label htmlFor="date" className="inputLabelClass">
              Data: <span className="mandatoryClass">*</span>
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
                className="datePickerClass"
                required
                minDate={new Date()}
                autoComplete="off"
              />
            </div>
          </div>
          <div className="text-[#444455]">
            <div>
              <DepartmentDropdown
                onOptionSelect={handleOptionSelection}
                autoComplete="off"
              />
              <span className="mandatoryClass">*</span>
              {selectedOption && (
                <p className="selectedOptionClass">{selectedOption}</p>
              )}
            </div>
          </div>
          <div className="text-[#444455]">
            <label htmlFor="guests" className="inputLabelClass">
              Guest:
            </label>
            <input
              type="text"
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="inputClass"
              autoComplete="off"
            />
          </div>

          <div className="flex items-center justify-between">

            <button
              type="submit"
              className="inline-block rounded-lg bg-[#77aaff] px-5 py-3 text-sm font-medium text-white"
            >
              Send
            </button>
          </div>
        </form>
      </div>

      <div className="relative h-64 w-full lg:h-full lg:w-1/2">
        <img
          alt="Benvenuto"
          src="https://www.gallerialivorno.it/wp-content/uploads/2022/07/Gabriella-Caverni-Le-ortensie-azzurre.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
}

export default AddAnEvent;
