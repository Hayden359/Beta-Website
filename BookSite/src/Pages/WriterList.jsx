
import { Link, useOutletContext } from "react-router-dom";

const DirectorList = () => {
    const { directors } = useOutletContext();

    const displayDirectors = directors.map(d => (
        <li key={d.id}>
            <Link to={`/directors/${d.id}`}>{d.name}</Link>
        </li>
    ));

    return (
        <>
            <Link to="/directors/new">Add New Director</Link>
            <ul>{displayDirectors}</ul>
        </>
    );
};

export default DirectorList;
