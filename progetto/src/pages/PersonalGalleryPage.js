import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { firebaseConfig } from '../components/firebase/FirebaseConfig';
import ArtGrid from '../components/artworks/ArtGrid';
import { setArtworks } from '../store';
import LoginPage from './Login';


function PersonalGalleryPage() {
    const dispatch = useDispatch();
    let app;
    const artworksRedux = useSelector((state) => state.artworks);
    const [artworksLocal, setArtworksLocal] = useState([]);

    useEffect(() => {
        app = initializeApp(firebaseConfig);

        if (app && app.apps && app.apps.length === 0) {
            initializeApp(firebaseConfig);
        }

        const db = getDatabase(app);

        const artworksRef = ref(db, 'users/Fabio/artworks');

        get(artworksRef)
            .then((snapshot) => {
                const artworksData = snapshot.val();
                console.log("Artworks data from Firebase:", artworksData);

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
            })
            .catch((error) => {
                console.error("Error getting data:", error);
            });
    }, [dispatch]);

    console.log("Artworks in Redux store:", artworksRedux.array); // Log gli artworks nello stato Redux

    const { logged } = useSelector((state) => {
        return state.users;
    })

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
