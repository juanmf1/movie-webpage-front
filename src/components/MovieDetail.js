import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnet } from "@fortawesome/free-solid-svg-icons";
import Spinner from "react-bootstrap/Spinner";

const MovieDetail = ({ user }) => {
  const [movie, setMovie] = useState(null);
  const [torrents, setTorrents] = useState(<li></li>);
  const [genres, setGenres] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [movieName, setMovieName] =useState("movieName");
  const [movieCover, setMovieCover] = useState("movieCover");

  const { id } = useParams();
  const url = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
  const urlFav = `http://localhost:8000/favoritos/${id}`;

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

      const movieData = { 
        movieName,
        movieCover
      }

      fetch(urlFav, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(movieData),
        headers: { 'Content-Type': "application/json"}
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
      setIsFav(true);
    }
  };

  let iconoFavSm;

  if (isFav) {
    iconoFavSm = (
      <i
        onClick={handleBookmarkClick}
        className="bookmark-sm ms-auto bi bi-bookmark-heart-fill"
      ></i>
    );
  } else {
    iconoFavSm = (
      <i
        onClick={handleBookmarkClick}
        className="bookmark-sm ms-auto bi bi-bookmark-heart"
      ></i>
    );
  }

  let iconoFavMd;

  if (isFav) {
    iconoFavMd = (
      <i
        onClick={handleBookmarkClick}
        className="bookmark-md ms-auto bi bi-bookmark-heart-fill"
      ></i>
    );
  } else {
    iconoFavMd = (
      <i
        onClick={handleBookmarkClick}
        className="bookmark-md ms-auto bi bi-bookmark-heart"
      ></i>
    );
  }

  let iconoFavXl;

  if (isFav) {
    iconoFavXl = (
      <i
        onClick={handleBookmarkClick}
        className="bookmark-xl ms-auto bi bi-bookmark-heart-fill"
      ></i>
    );
  } else {
    iconoFavXl = (
      <i
        onClick={handleBookmarkClick}
        className="bookmark-xl ms-auto bi bi-bookmark-heart"
      ></i>
    );
  }

  useEffect(() => {
    async function data() {
      const res = await fetch(url);
      const json = await res.json();

      // Guardo el nombre y el cover para los favoritos

      setMovieName(json.data.movie.title);
      setMovieCover(json.data.movie.medium_cover_image);

      // Bucle para mostrar todos los generos menos el ??ltimo

      let genres = [];

      for (var i = 0; i < json.data.movie.genres.length - 1; i++) {
        genres = [...genres, ` ${json.data.movie.genres[i]},`];
      }

      // Mostar el ??ltimo g??nero sin coma al final

      let genreLast = json.data.movie.genres[json.data.movie.genres.length - 1];

      setGenres(genres);

      setGenres([...genres, ` ${genreLast}`]);

      setMovie(json.data.movie);

      // usar la data desde json ac?? | porque si lo uso desde movies me va a dar cannot read property of undefined
      //                             |
      const links = await json.data.movie.torrents.map((torrent) => (
        <a
          style={{ color: "#ccc", textDecoration: "none", fontSize: "1.3rem" }}
          href={torrent.url}
          className="link-torrent d-flex my-1 mx-2 py-3 px-3"
        >
          {/* MOBILE */}
          <Dropdown.Item
            className="d-flex d-sm-none justify-content-around"
            href={torrent.url}
          >
            <i className="bi bi-tv me-2">{torrent.quality}</i>

            <i className="bi bi-hdd me-2"> {torrent.size}</i>
          </Dropdown.Item>

          <Row className="torrent-row w-100 d-none d-sm-flex">
            <Col className="torrent-type">
              <i className="bi bi-film me-2"></i>
              {`${torrent.type.charAt(0).toUpperCase()}${torrent.type.slice(
                1
              )}`}
            </Col>
            <Col className="torrent-quality">
              <i className="bi bi-tv me-2"></i>
              {torrent.quality}
            </Col>
            <Col className="torrent-size">
              <i className="bi bi-hdd me-2"></i>
              {torrent.size}
            </Col>
            <Col xs="auto">
              <a
                className="torrent-magnet w-100 h-100"
                href={`magnet:?xt=urn:btih:${torrent.hash}&dn=${torrent.url}`}
              >
                <FontAwesomeIcon icon={faMagnet} />
              </a>
            </Col>
          </Row>
        </a>
      ));
      setTorrents(links);
    }
    data();
  }, []);

  return (
    <>
      {!movie ? (
        <Container
          fluid
          className="w-100 vh-100 d-flex justify-content-center align-items-center "
        >
          <Spinner animation="border" variant="warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <>
          {/* MOBILE */}

          {/* Portada y fondo */}
          <div
            className="d-flex justify-content-center d-md-none"
            style={{
              backgroundImage: `url(${movie.background_image})`,
              backgroundSize: "cover",
            }}
          >
            <img
              className="m-2 movie-detail-cover h-75"
              src={movie.medium_cover_image}
              alt="movie cover"
            />
          </div>

          {/* Informacion de la pelicula */}
          <Container
            fluid
            className="movie-detail-container-mobile d-flex flex-column d-md-none d-xl-none p-3"
          >
            <div className="movie-detail-info mx-1 mt-3 d-flex flex-column align-items-start">
              <div className="d-flex align-items-start">
                <h2 className="p-2 me-2">{movie.title}</h2>
                {user && iconoFavSm}
              </div>

              <p className="p-2 h4">
                <u>Genres</u>: {genres}
              </p>
              <p className="p-2 h4">
                <u>Year</u>: {movie.year}
              </p>
            </div>
            <div className="movie-detail-info mt-3 d-flex d-sm-none flex-column align-items-start">
              <p className="p-2 h5 mb-3">
                {" "}
                Description: {movie.description_full}
              </p>
              <div className="fixed-bottom w-100">
                <Dropdown>
                  <Dropdown.Toggle
                    className="w-100 py-3"
                    variant="warning"
                    id="dropdown-basic"
                  >
                    <i class=" ms-3 h4 bi bi-download"> Download</i>
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="dark" className="w-100">
                    {torrents}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </Container>

          {/* MEDIUM */}

          {/* Portada, Fondo, Titulo, A??o y Generos MEDIUM*/}
          <Container
            fluid
            className="movie-detail-container d-none d-md-flex d-xl-none p-3"
            style={{
              backgroundImage: `url(${movie.background_image})`,
              backgroundSize: "cover",
            }}
          >
            {user && iconoFavMd}
            <img
              className="m-2 movie-detail-cover h-75"
              src={movie.medium_cover_image}
              alt="movie cover"
            />
            <div className="movie-detail-info mx-1 mt-3 d-flex flex-column align-items-start">
              <div className="d-flex align-items-end">
                <h2 className="p-2">{movie.title}</h2>
              </div>
              <p className="p-2 h4">
                <u>Genres</u>: {genres}
              </p>
              <p className="p-2 h4">
                <u>Year</u>: {movie.year}
              </p>
            </div>
          </Container>

          {/* Descripcion y Links MEDIUM */}
          <Container
            fluid
            className="movie-detail-container-mobile d-none d-sm-flex d-xl-none flex-column p-3"
          >
            <div className="movie-detail-info mt-1 d-flex flex-column align-items-start">
              <p className="p-2 h5 mb-3">
                <b>
                  <u>Description:</u>
                </b>{" "}
                <br />
                {movie.description_full}
              </p>
              <div className="torrents-container-mobile py-2 w-100">
                <div className="pb-2 download w-100">
                  <i class=" ms-3 h4 bi bi-download"> Download</i>
                </div>
                {torrents}
              </div>
            </div>
          </Container>

          {/* XL */}

          {/* Container ??nico para toda la info */}
          <Container
            fluid
            className="movie-detail-container d-none d-xl-flex p-3"
            style={{
              backgroundImage: `url(${movie.background_image})`,
              backgroundSize: "cover",
            }}
          >
            <div>
              {user && iconoFavXl}
              <img
                className="m-2 movie-detail-cover"
                src={movie.large_cover_image}
                alt="movie cover"
              />
            </div>
            <div className="movie-detail-info mx-4 mt-3 d-flex flex-column align-items-start">
              <div className="d-flex align-items-center">
                <h2 className="p-2">{movie.title}</h2>
              </div>
              <p className="p-2 h4">
                <u>Genres</u>: {genres}
              </p>
              <p className="p-2 h4">
                <u>Year</u>: {movie.year}
              </p>
              <p className="p-2 h5">{movie.description_full}</p>
              <div className="torrents-container py-2 w-100">
                <div className="pb-2 download w-100">
                  <i class=" ms-3 h4 bi bi-download"> Download</i>
                </div>
                {torrents}
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
};
export default MovieDetail;
