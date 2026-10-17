import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const DirectorContainer = () => {
    const [directors, setDirectors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/directors")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch directors");
                }
                return response.json();
            })
            .then(setDirectors)
            .catch((fetchError) => {
                console.error("Error fetching directors:", fetchError);
                setError(fetchError.message);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <NavBar />
            <main>
                <h1>Welcome to the Director's Directory!</h1>
                {loading && <p>Loading directors...</p>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && (
                    <Outlet context={{ directors, setDirectors }} />
                )}
            </main>
        </>
    );
}

export default DirectorContainer;
