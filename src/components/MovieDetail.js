import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Dropdown from "react-bootstrap/Dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnet } from "@fortawesome/free-solid-svg-icons";


const MovieDetail = () => {
  const [movie, setMovie] = useState([]);
  const [torrents, setTorrents] = useState(<li></li>);
  const { id } = useParams();
  const url = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;

  useEffect(() => {
    async function data() {
      const res = await fetch(url);
      const json = await res.json();
      setMovie(json.data.movie);
      // usar la data desde json acá | porque si lo uso desde movies me va a dar cannot read property of undefined
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

  const commentBookmark = (props) => (
    <Tooltip id="bookmark-tooltip" {...props}>
      Agregar a Favoritos
    </Tooltip>
  );

  // { movies.length > 0 && (

  //   const showGenres = () => {
  //    let genres=[];
  //    for (var i = 0; i < 2; i++) {
  //      genres.push(`${movie.genres[i]}`);
  //    }
  //    console.log(genres);
  //    return genres;
  //  }
  // )

  // }

  return (
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
            <Button variant="warning">
              <i className="h2 bi bi-bookmark-heart"></i>
            </Button>
          </div>

          <p className="p-2 h4">
            <u>Genres</u>: {movie.genres}
          </p>
          <p className="p-2 h4">
            <u>Year</u>: {movie.year}
          </p>
        </div>
        <div className="movie-detail-info mt-3 d-flex d-sm-none flex-column align-items-start">
          <p className="p-2 h5 mb-3"> Description: {movie.description_full}</p>
          <div className=" py-2 w-100">
            <Dropdown>
              <Dropdown.Toggle
                className="w-100"
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

            {/* Portada, Fondo, Titulo, Año y Generos MEDIUM*/}
      <Container
        fluid
        className="movie-detail-container d-none d-md-flex d-xl-none p-3"
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
        <div className="movie-detail-info mx-1 mt-3 d-flex flex-column align-items-start">
          <div className="d-flex align-items-end">
            <h2 className="p-2">{movie.title}</h2>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={commentBookmark}
            >
              <Button variant="warning" className="m-3 movie-detail-bookmark">
                <i className="h3 bi bi-bookmark-heart"></i>
              </Button>
            </OverlayTrigger>
          </div>
          <p className="p-2 h4">
            <u>Genres</u>: {movie.genres}
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

            {/* Container único para toda la info */}
      <Container
        fluid
        className="movie-detail-container d-none d-xl-flex p-3"
        style={{
          backgroundImage: `url(${movie.background_image})`,
          backgroundSize: "cover",
        }}
      >
        <div>
          <img
            className="m-2 movie-detail-cover"
            src={movie.large_cover_image}
            alt="movie cover"
          />
        </div>
        <div className="movie-detail-info mx-4 mt-3 d-flex flex-column align-items-start">
          <div className="d-flex align-items-end">
            <h2 className="p-2">{movie.title}</h2>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={commentBookmark}
            >
              <Button variant="warning" className="m-3 movie-detail-bookmark">
                <i className="h3 bi bi-bookmark-heart"></i>
              </Button>
            </OverlayTrigger>
          </div>
          <p className="p-2 h4">
            <u>Genres</u>: {movie.genres}
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
  );
};
export default MovieDetail;
