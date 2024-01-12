import className from "classnames";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit, MdOutlineEditOff } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { switchFavoriteEvent } from "../HomePage/store";
import { remove, ref, getDatabase, set, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./FirebaseConfig";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { GoChevronDown } from "react-icons/go";
import DepartmentDropdown from "./DepartmentDropdown";


async function writeData() {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    const dbRef = ref(db);

    try {
        for (let i = 0; i < 4; i++) {
            const e = {
                name: "Event " + i,
                date: "12/12/12",
                department: "Art",
                favorite: false,
                full: false,
                guests: "sdf",
                id: 5 + i,
                image: "https://cdn.studenti.stbm.it/images/2019/03/11/leonardo-da-vinci-orig.jpeg"
            }

            set(ref(db, "users/Fabio/customEvents/" + e.name), e);
        }
    } catch (e) {
        console.log(e);
    }
}

// await writeData();

function HandleEventCard({ event }) {

    const app = initializeApp(firebaseConfig);
    const db = getDatabase();

    const fullContainerClass = className("flex")
    const containerClass = className("border-2 mb-2 p-4 max-w-md bg-white rounded-md shadow-md mt-4");
    const favoriteClass = className("ml-auto text-2xl");
    const imageClass = className("max-w-96 max-h-96");
    const titleAndHeart = className("flex");
    const iconsContainerClass = className("");
    const trashIconClass = className("w-5 h-5 mb-2");
    const editIconClass = className("w-5 h-5");

    const formContainerClass = className("border mb-2 mt-0");
    const successDivClass = className("mt-4 p-4 bg-green-100 border border-green-400 text-green-700");
    const successPClass = className("mb-1");
    const inputContainerClass = className("flex flex-col");
    const inputLabelClass = className("mb-1");
    const inputClass = className("border border-gray-300 rounded-md p-2");
    const buttonClass = className("bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600");
    const selectedOptionClass = className("mt-2 p-2 bg-blue-500 text-white rounded");
    const datePickerContainerClass = className("flex relative items-center");
    const datePickerClass = className("w-full p-2 border rounded outline-none");
    const chevronClass = className("absolute right-0 ml-2 m-2");

    const dispatch = useDispatch();

    const [editState, setEditState] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({
        name: event.name,
        date: event.date,
        department: event.department,
        guests: event.guests,
        image: event.image
    });

    const handleClickDelete = function () {
        remove(ref(db, 'users/Fabio/customEvents/' + event.name));
        setDeleteState(!deleteState);
    }

    const handleClickEdit = function () {
        setSuccess(null);
        setEditState(!editState);
    }

    const handleClickHeart = function (event) {
        dispatch(switchFavoriteEvent(event));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const eventRef = ref(db, "users/Fabio/customEvents/" + event.name);

        update(eventRef, {
            name: formData.name,
            date: selectedDate,
            department: selectedOption,
            guests: formData.guests,
            image: formData.image
        })

        setSuccess(true);

        setEditState(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    }

    const handleChangeDate = function (date) {
        setSelectedDate(date);
    }

    const handleOptionSelection = (option) => {
        setSelectedOption(option);
    }

    return (
        <div>
            {!deleteState && (
                <div className={fullContainerClass}>
                    <div className={containerClass}>
                        <div>
                            <img src={event.image} className={imageClass} />
                            <div className={titleAndHeart}>
                                <div>{event.name}</div>
                                {event.favorite ? (
                                    <FaHeart className={favoriteClass} onClick={() => handleClickHeart(event)} />
                                ) : (
                                    <FaRegHeart className={favoriteClass} onClick={() => handleClickHeart(event)} />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={iconsContainerClass}>
                        <FaTrash className={trashIconClass} onClick={handleClickDelete} />
                        <MdModeEdit className={editIconClass} onClick={handleClickEdit} />
                    </div>
                </div>
            )}
            {success && (
                <div className={successDivClass}>
                    <p className={successPClass}><strong>Success:</strong> {success}</p>
                </div>
            )}
            {editState && (
                <div className="flex">

                    <form className={formContainerClass} onSubmit={handleSubmit}>
                        <div>

                            <div className={inputContainerClass}>
                                <label htmlFor="name" className={inputLabelClass}>
                                    Name:
                                </label>
                                <input type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={inputClass}
                                />

                            </div>
                        </div>
                        <div>
                            <div className={inputContainerClass}>
                                <label htmlFor="image" className={inputLabelClass}>
                                    Image:
                                </label>
                                <input type="text"
                                    id="img"
                                    name="img"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                        <div className={inputContainerClass}>
                            <label htmlFor="date" className={inputLabelClass}>
                                Date:
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
                                        <GoChevronDown className={chevronClass} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={inputContainerClass}>
                            <div>
                                <DepartmentDropdown onOptionSelect={handleOptionSelection} />
                                {selectedOption && (
                                    <p className={selectedOptionClass}>Selected option: {selectedOption}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <div className={inputContainerClass}>
                                <label htmlFor="guests" className={inputLabelClass}>
                                    Guests:
                                </label>
                                <input type="text"
                                    id="guests"
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className={inputClass}
                                />

                            </div>
                        </div>
                        <button type="submit" className={buttonClass}>
                            Submit
                        </button>
                    </form>
                    <MdOutlineEditOff className={editIconClass} onClick={handleClickEdit} />
                </div>
            )}
        </div >
    )
}

export default HandleEventCard;