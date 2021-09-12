import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
const MovieCard = ({ movieId, title, year, rating, genre, img, user }) => {
  
  const handleBookmarkClick = (event) =>{
    event.preventDefault();
  }

  return (
    <Link className="text-decoration-none" to={`/movie/${movieId}`}>
      <Card className="mx-2 mb-2 p-0 movie-card" bg="dark">
        <Card.ImgOverlay>
          {user && (
            <i className="bookmark-sm ms-auto d-md-none bi bi-bookmark-heart"></i>
          )}
          <div className="genre-container d-none d-md-flex flex-wrap">
            {genre && (
              <div className="d-flex flex-column align-items-start">
                <span className="p-1 px-2">{genre[0]}</span>
                {genre[1] && <span className=" mt-1 p-1 px-2">{genre[1]}</span>}
              </div>
            )}
            {user && <i onClick={handleBookmarkClick} className="bookmark-sm ms-auto bi bi-bookmark-heart"></i>}
          </div>
          <div className="d-flex"></div>
        </Card.ImgOverlay>
        <Card.Img variant="top" src={img} />
        <Card.Body className="d-none d-md-flex flex-column pb-0 px-4">
          <Card.Title>{title}</Card.Title>
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
