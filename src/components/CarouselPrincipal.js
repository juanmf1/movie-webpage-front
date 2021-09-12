import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Link from "react-router-dom/Link";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

const CarouselPrincipal = () => {
  const [moviesCarousel, setMoviesCarousel] = useState(null);
  const urlQuery = "https://yts.mx/api/v2/movie_details.json?movie_id=";

  useEffect(() => {
    getmovies();
  }, []);

  async function getmovies() {
    let newMovies = [];
    const response1 = await fetch(`${urlQuery}33990`);
    const json1 = await response1.json();
    newMovies = [...newMovies, json1.data.movie];
    const response2 = await fetch(`${urlQuery}34390`);
    const json2 = await response2.json();
    newMovies = [...newMovies, json2.data.movie];
    const response3 = await fetch(`${urlQuery}34544`);
    const json3 = await response3.json();
    newMovies = [...newMovies, json3.data.movie];
    setMoviesCarousel(newMovies);
  }

  return (
    <>
      {!moviesCarousel ? (
        <Container className="container-loading-carrousel w-100 d-flex justify-content-center align-items-center" fluid>
          <Spinner animation="border" variant="warning" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      ) : (
        <>
          <Carousel controls={false} fade className="mb-3 d-flex">
            {moviesCarousel.map((movie) => (
              <Carousel.Item className="carousel-principal">
                <div
                  className="h-50 d-none d-md-flex px-2 py-2"
                  style={{
                    backgroundImage: `url(${movie.background_image_original})`,
                    backgroundSize: "cover",
                  }}
                >
                  <img
                    className="ms-lg-5 p-5 d-block img-caratula-carousel"
                    src={movie.medium_cover_image}
                    alt="caratula pelicula"
                  />
                  <div className="d-flex flex-column justify-content-center align-items-start">
                    <h3 className="h1 title-carousel p-2">{movie.title}</h3>
                    <p className="description-carousel d-none d-md-block px-3 py-2">
                      {movie.description_intro}
                    </p>
                    <Link to={`/movie/${movie.id}`}>
                      <Button variant="warning" className="mt-2 px-5 py-3">
                        Download now
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* MOBILE */}

                <div
                  className="back-mobile h-50 d-flex d-md-none p-5"
                  style={{
                    backgroundImage: `url(${movie.large_cover_image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="d-flex flex-column align-items-center">
                    <h3 className="h1 title-carousel p-2">{movie.title}</h3>
                    <p className="description-carousel px-3 py-2">
                      {movie.description_intro}
                    </p>
                    <Link to={`/movie/${movie.id}`}>
                      <Button variant="warning" className="mt-2 px-5 py-3">
                        Download now
                      </Button>
                    </Link>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </>
      )}
    </>
  );
};

export default CarouselPrincipal;
