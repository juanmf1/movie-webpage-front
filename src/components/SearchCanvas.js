import { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Link from "react-router-dom/Link";

const SearchCanvas = ({ show, close, query, handleQueryChange }) => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = useState(false);

  useEffect(() => {
    fetch(
      `https://yts.mx/api/v2/list_movies.json?query_term=${query}&order_by=asc`
    )
      .then((res) => res.json())
      .then((data) => setResults(data.data.movies));
    setSearch(false);
  }, [query]);
  

  return (
    <Offcanvas className="search-canvas" show={show} onHide={close}>
      <Offcanvas.Header className="header-canvas" closeButton>
        <Offcanvas.Title>Search engine</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex">
          <Form className="w-100">
            <Form.Control
              value={query}
              onChange={handleQueryChange}
              type="text"
              placeholder="Search a movie..."
            />
          </Form>
        </div>
        {results &&
          results.map((movie) => (
            <Link
              className="text-decoration-none"
              onClick={close}
              to={`/movie/${movie.id}`}
            >
              <div className="d-flex align-items-center query-link my-2 p-2">
                <img src={movie.small_cover_image} alt="movie-cover" />
                <p className="ms-2 h5">
                  {movie.title} ({movie.year})
                </p>
              </div>
            </Link>
          ))}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SearchCanvas;
