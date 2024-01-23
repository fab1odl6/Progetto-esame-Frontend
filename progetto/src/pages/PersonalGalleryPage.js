import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';
import { firebaseConfig } from '../components/firebase/FirebaseConfig';
import ArtGrid from '../components/artworks/ArtGrid';
import { setArtworks, clearText } from '../store';
import LoginPage from './Login';


function PersonalGalleryPage() {

    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const dbRef = ref(db);

    const dispatch = useDispatch();
    const artworksRedux = useSelector((state) => state.artworks);
    const [artworksLocal, setArtworksLocal] = useState([]);

    const { user, logged } = useSelector((state) => {
        return state.users;
    })

    useEffect(() => {
        dispatch(clearText());
      }, []);


    const localUpdate = async () => {

        const artworksRef = child(dbRef, '/users/' + user.personalData.name + '/artworks');

        try {
            const snapshot = await get(artworksRef);

            if (snapshot.exists()) {
                const artworksData = snapshot.val();
                console.log("Artworks data from Firebase: ", artworksData);

                if (Array.isArray(artworksData)) {
                    dispatch(setArtworks(artworksData));
                    setArtworksLocal(artworksData); // Aggiorna lo stato locale con i dati
                } else if (artworksData && typeof artworksData === 'object') {
                    // converto oggetto in un array
                    const dataArray = Object.values(artworksData);
                    dispatch(setArtworks(dataArray));
                    setArtworksLocal(dataArray);
                } else {
                    console.error("Artworks data is not in a recognized format");
                }
            }
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (logged) {
            localUpdate();
        }
    }, [dispatch, logged]);


    console.log("Artworks in Redux store:", artworksRedux); // Log gli artworks nello stato Redux


    return (
        <div>
            {logged ? (<div>
                <h1>Personal Gallery</h1>
                <ArtGrid artworks={artworksLocal} />
            </div>
            ) : (
                <LoginPage />
            )}
        </div>
    );
}

export default PersonalGalleryPage;