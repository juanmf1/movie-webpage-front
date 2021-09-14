import { useEffect, useState } from "react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import MovieCard from "./MovieCard";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
SwiperCore.use([Navigation]);

const SwiperMovies = ({ mode, user }) => {
  const [movies, setMovies] = useState(null);


  let url = "";
  let header = "";


  if (mode === "like") {
    url = "https://yts.mx/api/v2/list_movies.json?limit=20&sort_by=like_count";
    header = (
      <header className="section-header p-2 d-flex">
        <i className="bi bi-heart-fill h2 header-icon"></i>
        <h2 className="section-title ms-3">Populares entre los usuarios:</h2>
      </header>
    );
  } else if (mode === "last") {
    url = "https://yts.mx/api/v2/list_movies.json?limit=20&sort_by=date_added";
    header = (
      <header className="section-header p-2 d-flex">
        <i className="bi bi-clock h2 header-icon"></i>
        <h2 className="section-title ms-3">Últimas añadidas:</h2>
      </header>
    );
  } else if (mode === "year") {
    url = "https://yts.mx/api/v2/list_movies.json?limit=20&sort_by=year";
    header = (
      <header className="section-header p-2 d-flex">
        <i className="bi bi-film h2 header-icon"></i>
        <h2 className="section-title ms-3">Últimas películas:</h2>
      </header>
    );
  }

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMovies(data.data.movies));
  }, []);


  return (
    <>
      {header}
      <Swiper
        navigation
        loop={true}
        spaceBetween={50}
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 0,
            slidesPerGroup: 1,
          },
          540: {
            slidesPerView: 3,
            spaceBetween: 30,
            slidesPerGroup: 2,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 40,
            slidesPerGroup: 3,
          },
          1100: {
            slidesPerView: 5,
            spaceBetween: 40,
            slidesPerGroup: 4,
          },
          1300: {
            slidesPerView: 6,
            spaceBetween: 60,
            slidesPerGroup: 5,
          },
          1500: {
            slidesPerView: 7,
            spaceBetween: 40,
            slidesPerGroup: 6,
          },
        }}
      >
        {!movies ? (
          <Container
            className="w-100 d-flex justify-content-center align-items-center"
            fluid
          >
            <Spinner className="m-5" animation="grow" variant="warning"/>
          </Container>
        ) : (
          <>
            {movies.map((movie) => (
              <SwiperSlide>
                <MovieCard
                  movieId={movie.id}
                  title={movie.title_english}
                  year={movie.year}
                  sum={movie.summary}
                  rating={movie.rating}
                  genre={movie.genres}
                  img={movie.medium_cover_image}
                  user={user}
                />
              </SwiperSlide>
            ))}
          </>
        )}
      </Swiper>
    </>
  );
};

export default SwiperMovies;
