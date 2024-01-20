import { useState } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { firebaseConfig } from "../firebase/FirebaseConfig";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import DepartmentDropdown from "../dropdowns/DepartmentDropdown";


function AddAnEvent() {
    const containerClass = "p-4 max-w-md bg-white rounded-md shadow-md mt-4 h-full";
    const errorDivClass = "mt-4 p-4 bg-red-100 border border-red-400 text-red-700";
    const errorPClass = "mb-1";
    const successDivClass = "mt-4 p-4 bg-green-100 border border-green-400 text-green-700";
    const successPClass = "mb-1";
    const mandatoryClass = "text-red-500";
    const titleClass = "text-lg font-bold mb-4 mt-2";
    const formClass = "space-y-4";
    const inputContainerClass = "flex flex-col";
    const inputLabelClass = "mb-1";
    const inputClass = "border border-gray-300 rounded-md p-2";
    const buttonClass = "bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600";
    const selectedOptionClass = "mt-2 p-2 bg-blue-500 text-white rounded";
    const datePickerContainerClass = "flex relative items-center";
    const datePickerClass = "w-full p-2 border rounded outline-none";


    const app = initializeApp(firebaseConfig);

    const [formData, setFormData] = useState({
        date: "",
        guests: "",
        image: "",
        name: "",
        department: ""
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelection = (option) => {
        setSelectedOption(option);
    }

    const handleChangeDate = function (date) {
        setSelectedDate(date);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !selectedDate || !formData.image || !selectedOption) {
            setError("Fill the mandatory fields!");
            setSuccess(null);
            return;
        }

        const db = getDatabase();
        set(ref(db, 'events/' + formData.name), {
            date: selectedDate.toDateString(),
            favorite: false,
            full: false,
            guests: formData.guests,
            id: 4,
            image: formData.image,
            name: formData.name,
            department: selectedOption
        });

        set(ref(db, 'users/Fabio/customEvents/' + formData.name), {
            date: selectedDate.toDateString(),
            favorite: false,
            full: false,
            guests: formData.guests,
            id: 4,
            image: formData.image,
            name: formData.name,
            department: selectedOption
        });

        setFormData({
            date: "",
            favorite: false,
            full: false,
            guests: "",
            image: "",
            name: ""
        })

        setSuccess("Great! Your event has been uploaded correctly!");
        setError(null);
        setSelectedDate(null);
        setSelectedOption(null);
    }


    return (
        <div className={containerClass}>
            {error && (
                <div className={errorDivClass}>
                    <p className={errorPClass}><strong>Error:</strong> {error}</p>
                </div>
            )}
            {success && (
                <div className={successDivClass}>
                    <p className={successPClass}><strong>Success:</strong> {success}</p>
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
                                    id="date"
                                    name="date"
                                    value={selectedDate}
                                    selected={selectedDate}
                                    onChange={handleChangeDate}
                                    dateFormat="dd/MM/yyyy"
                                    className={datePickerClass}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={inputContainerClass}>
                    <div>
                        <DepartmentDropdown onOptionSelect={handleOptionSelection} />
                        <span className={mandatoryClass}>*</span>
                        {selectedOption && (
                            <p className={selectedOptionClass}>Selected option: {selectedOption}</p>
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
