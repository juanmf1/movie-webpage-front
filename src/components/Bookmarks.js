import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import MovieCard from "./MovieCard";

const Bookmarks = ({ user }) => {
  const [bookmarks, setBookmarks] = useState(null);

  const url = "http://localhost:8000/favoritos/user";

  useEffect(async () => {
    const response = await fetch(url, { credentials: "include" });
    const data = await response.json();

    const fetchedMovies = await data.data.map((movie) => {
      fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${movie.movie_id}`
      )
        .then((response) => response.json())
        .then((data) => {
            setBookmarks([...bookmarks, data.data.movie]);
            console.log(bookmarks)});
    });
  }, []);

  return (
    <>
      {bookmarks ?(
        <Container fluid className="w-100">
          <Row>
            {bookmarks.map((bookmark) => {
              <Col>
                <MovieCard
                  movieId={bookmark.id}
                  title={bookmark.title_english}
                  year={bookmark.year}
                  sum={bookmark.summary}
                  rating={bookmark.rating}
                  genre={bookmark.genres}
                  img={bookmark.medium_cover_image}
                  user={user}
                ></MovieCard>
              </Col>;
            })}
          </Row>
        </Container>
      ): (
        <Container
          className="w-100 d-flex justify-content-center align-items-center"
          fluid
        >
          <Spinner className="m-5" animation="grow" variant="warning" />
        </Container>
      )}
    </>
  );
};

export default Bookmarks;
