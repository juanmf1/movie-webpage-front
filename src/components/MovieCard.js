import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const MovieCard = ({ movieId, title, year, rating, genre, img, user }) => {
  const [isFav, setIsFav] = useState(false);

  const urlFav = `http://localhost:8000/favoritos/${movieId}`;

  useEffect(async () => {
    const response = await fetch(urlFav, { credentials: "include" });
    const data = await response.json();

    if (data.message === "hay favorito") {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  }, []);

  const handleBookmarkClick = (event) => {
    event.preventDefault();
    if (isFav) {
      fetch(urlFav, { method: "DELETE", credentials: "include" })
        .then((response) => response.json())
        .then((data) => console.log(data));
      setIsFav(false);
    } else {
      fetch(urlFav, { method: "POST", credentials: "include" })
        .then((response) => response.json())
        .then((data) => console.log(data));
      setIsFav(true);
    }
  };

  let iconoFav;

  if (isFav) {
    iconoFav = (
      <i
        onClick={handleBookmarkClick}
        className="bookmark-sm ms-auto bi bi-bookmark-heart-fill"
      ></i>
    );
  } else {
    iconoFav = (
      <i
        onClick={handleBookmarkClick}
        className="bookmark-sm ms-auto bi bi-bookmark-heart"
      ></i>
    );
  }

  return (
    <Link className="text-decoration-none" to={`/movie/${movieId}`}>
      <Card className="mx-2 mb-2 p-0 movie-card" bg="dark">
        <Card.ImgOverlay>
          <div className="genre-container d-none d-md-flex flex-wrap">
            {genre && (
              <div className="d-flex flex-column align-items-start">
                <span className="p-1 px-2">{genre[0]}</span>
                {genre[1] && <span className=" mt-1 p-1 px-2">{genre[1]}</span>}
              </div>
            )}
            {user && iconoFav}
          </div>
          <div className="d-flex"></div>
        </Card.ImgOverlay>
        <Card.Img variant="top" src={img} />
        <Card.Body className="d-none d-md-flex flex-column pb-0 px-4">
          <Card.Title>{title} </Card.Title>
          <Card.Text>
            <div className="card-tag-container d-flex">
              <p className="me-1 botones-link">{year}</p>
              <p>{rating} ⭐</p>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default MovieCard;
