import "./App.css";
import { useState,useEffect} from 'react';
// Componentes
import Navigationbar from "./components/Navbar";
import CarouselPrincipal from "./components/CarouselPrincipal";
import Footer from "./components/Footer";
import MovieDetail from "./components/MovieDetail";
import SwiperMovies from "./components/SwiperMovies";
//Componentes ruteo
import { BrowserRouter, Switch, Route } from "react-router-dom";
function App() {

  const [showCanvas, setShowCanvas] = useState(null);


  return (
    <>
      <BrowserRouter>
        <Navigationbar/>
        <Switch>
          <Route path="/" exact>
            <CarouselPrincipal />
            <div className="px-2 px-lg-4">
              <SwiperMovies mode="like" />
              <SwiperMovies mode="last" />
              <SwiperMovies mode="year" />
            </div>
          </Route>
          <Route path="/movie/:id" component={MovieDetail} exact />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
