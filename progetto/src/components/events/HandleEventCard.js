import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdModeEdit, MdOutlineEditOff } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { switchFavoriteEvent, updateEvent } from "../../store";
import { remove, ref, getDatabase, set, update } from "firebase/database";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase/FirebaseConfig";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { GoChevronDown } from "react-icons/go";
import DepartmentDropdown from "../dropdowns/DepartmentDropdown";


async function writeData() {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();

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

function HandleEventCard({ event, submit, setSubmit }) {

    const app = initializeApp(firebaseConfig);
    const db = getDatabase();

    const fullContainerClass = "bg-gray-200 p-4";
    const containerClass = "flex items-center justify-between bg-white p-4 shadow-md";
    const imageContainerClass = "mr-4";
    const imageClass = "w-16 h-16 object-cover";
    const titleAndHeartClass = "flex items-center";
    const favoriteClass = "text-red-500 cursor-pointer ml-2";
    const iconsContainerClass = "flex mt-1 items-center";
    const trashIconClass = "text-gray-500 cursor-pointer mr-2";
    const editIconClass = "text-gray-500 cursor-pointer";

    const successDivClass = "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative";
    const successPClass = "font-bold";
    const formContainerClass = "max-w-md mx-auto p-4 bg-white shadow-md";
    const inputContainerClass = "mb-4";
    const inputLabelClass = "block text-gray-700 text-sm font-bold mb-2";
    const inputClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
    const datePickerContainerClass = "relative";
    const datePickerClass = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline";
    const chevronClass = "absolute right-0 top-0 h-full flex items-center p-2 pointer-events-none";
    const selectedOptionClass = "text-gray-700 text-sm mt-2";
    const buttonClass = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";

    const dispatch = useDispatch();

    const { user } = useSelector((state) => {
        return state.users;
    })

    const [editState, setEditState] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);
    const [success, setSuccess] = useState(null);
    const [favorite, setFavorite] = useState(event.favorite);
    const [formData, setFormData] = useState({
        name: event.name,
        date: event.date,
        department: event.department,
        guests: event.guests,
        image: event.image
    });

    const handleClickDelete = function () {
        remove(ref(db, "users/" + user.personalData.name + "/customEvents/" + event.name));
        remove(ref(db, "events/" + event.name));
        setDeleteState(!deleteState);
        setSubmit(!submit);
    }

    const handleClickEdit = function () {
        setSuccess(null);
        setEditState(!editState);
        setSubmit(!submit);
    }

    const handleClickHeart = function () {
        setFavorite(!favorite);
        dispatch(updateEvent(event));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleClickDelete();

        const eventRef = ref(db, "users/" + user.personalData.name + "/customEvents/" + formData.name);
        set(eventRef, {
            name: formData.name,
            date: selectedDate,
            department: selectedOption,
            guests: formData.guests,
            image: formData.image,
            favorite: favorite,
            full: event.full,
            id: event.id
        });

        setSuccess(true);
        setEditState(false);
        setDeleteState(false);
        setSubmit(!submit);
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
                            <div className={imageContainerClass}><img src={event.image} className={imageClass} /></div>
                            <div className={titleAndHeartClass}>
                                <div>{formData.name}</div>
                                {favorite ? (
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
                    <p className={successPClass}><strong>Success</strong> {success}</p>
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