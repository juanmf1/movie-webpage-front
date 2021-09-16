import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Link from "react-router-dom/Link";

const Bookmarks = ({ user }) => {
  const [bookmarks, setBookmarks] = useState(null);

  const url = "http://localhost:8000/favoritos/user";

  useEffect(async () => {
    const response = await fetch(url, { credentials: "include" });
    const data = await response.json();
    setBookmarks(data.data);
  }, []);

  return (
    <>
      {!bookmarks ? (
        <Container
          className="w-100 d-flex justify-content-center align-items-center"
          fluid
        >
          <Spinner className="m-5" animation="grow" variant="warning" />
        </Container>
      ) : (
        <Container fluid className="w-100 d-flex flex-wrap p-5 bookmark-container">
          {bookmarks.map((movie) => (
            
              <div className=" m-1">
                <Link to={`/movie/${movie.movie_id}`}>
                <img className="bookmark-cover"src={movie.movie_cover} />
                </Link>
              </div>
            
          ))}
        </Container>
      )}
    </>
  );
};

export default Bookmarks;
