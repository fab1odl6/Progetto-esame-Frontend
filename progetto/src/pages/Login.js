import React, { useState, useContext, useEffect } from "react";
import NavigationContext from "../context/navigation";
import { getDatabase, ref, get, child } from "firebase/database";
import { useDispatch } from "react-redux";
import { setUser, setLogged, logoutUser, clearText, setPage } from "../store";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../components/firebase/FirebaseConfig";

const backgroundimageClass = "flex h-screen w-full items-center justify-center bg-cover bg-no-repeat";
const loginformClass = "rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8";
const textloginClass = "text-white";
const iconClass = "mb-8 flex flex-col items-center";
const museumnameClass = "mb-2 text-2xl";
const errorClass = "mt-2 text-red-500";
const endformClass = "mt-8 flex justify-center text-lg text-black";
const submitbuttonClass = "rounded-3xl bg-yellow-400 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600";
const cursorpointerClass = "cursor-pointer text-white-500";
const inputtextClass = "rounded-3xl border-none bg-yellow-400 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md";
const styleinputtextClass = "mb-4 text-lg";
const enterloginClass = "text-gray-300";
const backgroundClass = "w-24 filter brightness-0 invert-1";

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const dbRef = ref(db);

async function getArts(user) {
  const artArray = [];
  const artRef = child(dbRef, "/users/" + user.name + "/artworks");

  try {
    const snapshot = await get(artRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const key in data) {
        const art = data[key];
        artArray.push({
          id: art.id,
          link: art.link,
          authorName: art.authorName,
          title: art.title,
          image: art.image,
          department: art.department,
          culture: art.culture,
          period: art.period,
          date: art.date,
          dimensions: art.dimensions,
          city: art.city,
          state: art.state,
          country: art.country,
          classification: art.classification,
          favorite: art.favorite,
          full: art.full,
          type: art.type,
        });
      }
    }
  } catch (e) {
    console.error(e);
  }
  return artArray;
}

async function getEvents(user) {
  const eventArray = [];
  const eventRef = child(dbRef, "/users/" + user.name + "/events");

  try {
    const snapshot = await get(eventRef);
    if (snapshot.exists()) {
      const data = snapshot.val();
      for (const key in data) {
        const event = data[key];
        eventArray.push({
          id: event.id,
          name: event.name,
          image: event.image,
          date: event.date,
          department: event.department,
          guests: event.guests,
          favorite: event.favorite,
          full: event.full,
          userGenerated: event.userGenerated,
          generator: event.generator,
        });
      }
    }
  } catch (e) {
    console.error(e);
  }
  return eventArray;
}

async function getCustomEvents(user) {
  const eventArray = [];
  const eventRef = child(dbRef, "/users/" + user.name + "/customEvents");

  try {
    const snapshot = await get(eventRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      Object.keys(data).forEach((key) => {
        const event = data[key];
        eventArray.push({
          id: event.id,
          name: event.name,
          image: event.image,
          date: event.date,
          department: event.department,
          guests: event.guests,
          favorite: false,
          full: false,
          userGenerated: event.userGenerated,
          generator: event.generator,
        });
      });
    }
  } catch (e) {
    console.error(e);
  }

  return eventArray;
}

const LoginPage = function () {
  const dispatch = useDispatch();

  const { navigate } = useContext(NavigationContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(clearText());
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const usersRef = ref(db, "users/");

    try {
      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const users = snapshot.val();

        if (users) {
          const matchedUser = Object.values(users).find(
            (u) =>
              u.personalData.username.toLowerCase() ===
                username.toLowerCase() && u.personalData.password === password
          );

          if (matchedUser) {
            const artworks = await getArts(matchedUser.personalData);
            const events = await getEvents(matchedUser.personalData);
            const customEvents = await getCustomEvents(
              matchedUser.personalData
            );
            dispatch(setUser({ matchedUser, artworks, events, customEvents }));
            dispatch(setLogged(true));

            navigate("/");
          } else {
            setError("Incorrect Email or Password, try again");
            setUsername("");
            setPassword("");
          }
        } else {
          setError("Invalid user data");
        }
      }
    } catch (error) {
      setError("An error occurred during user verification");
      console.error("Error during user verification: ", error);
    }
  };

  return (
    <div
      className={backgroundimageClass}
      style={{
        backgroundImage:
          "url('https://cdn.pixabay.com/photo/2015/12/15/05/43/starry-night-1093721_960_720.jpg')",
      }}
    >
      <div className={loginformClass}>
        <div className={textloginClass}>
          <div className={iconClass}>
            <img
              src="https://cdn.icon-icons.com/icons2/1364/PNG/512/publicmuseumsign_89226.png"
              width="150"
              alt=""
              class={backgroundClass}
              style={{color: "#556699" }}
            />
            <h1 className={museumnameClass}>ArtTreasures</h1>
            <span className={enterloginClass}>Enter Login Details</span>
          </div>
          <form onSubmit={handleLogin}>
            <div className={styleinputtextClass}>
              <input
                className={inputtextClass}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
            </div>
            <div className={styleinputtextClass}>
              <input
                className={inputtextClass}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
                required
              />
            </div>
            <div className={errorClass}>{error}</div>{" "}
            {/* Render error message */}
            <div className={endformClass}>
              <button
                type="submit"
                className={submitbuttonClass}
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex">
            Don't have an account yet?{" "}
            <a
              className={cursorpointerClass}
              onClick={() => navigate("/register")}
            >
              &nbsp;<b className="underline">Register!</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
