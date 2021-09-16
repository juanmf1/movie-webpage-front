import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useState, useEffect } from "react";
// Componentes
import Navigationbar from "./components/Navbar";
import CarouselPrincipal from "./components/CarouselPrincipal";
import Footer from "./components/Footer";
import MovieDetail from "./components/MovieDetail";
import SwiperMovies from "./components/SwiperMovies";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import EditUserModal from "./components/EditUserModal";
import Bookmarks from "./components/Bookmarks";


//Componentes ruteo
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  // Login
  const [user, setUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setSignupModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    handleCloseLoginModal();
  };


  const handleShowSignupModal = () => {
    setSignupModal(true);
  };

  const handleCloseSignupModal = () => {
    setSignupModal(false);
  };

  const handleShowEditUserModal = () => {
    setShowEditUserModal(true);
  };

  const handleCloseEditUserModal = () => {
    setShowEditUserModal(false);
  };

  const handleModifyUser = (name) =>{
    setUser(name);
    handleCloseEditUserModal();
  }

  const handleLogout = () => {
    const url = "http://localhost:8000/auth";

    fetch(url, { method: "DELETE", credentials: "include" }).then(
      (response) => {
        if (response.status === 200) {
          setUser(null);
        } else {
          console.log("Error al cerrar sesión");
        }
      }
    );
  };

  useEffect(() => {
    const url = "http://localhost:8000/auth/check";

    fetch(url, { method: "GET", credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "ok") {
          setUser(data.data.name);
        }
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <SignupModal
          onShow={showSignupModal}
          onClose={handleCloseSignupModal}
        />
        <LoginModal
          onShow={showLoginModal}
          onClose={handleCloseLoginModal}
          onLoginSuccess={handleLoginSuccess}
        />
        <EditUserModal
        onShow={showEditUserModal}
        onClose={handleCloseEditUserModal}
        user= {user}
        modifyUser = {handleModifyUser}
        />
        <Navigationbar
          user={user}
          onLogout={handleLogout}
          onShowLoginModal={handleShowLoginModal}
          onShowSignupModal={handleShowSignupModal}
          onShowEditUserModal={handleShowEditUserModal}
        />
        <Switch>
          <Route path="/" exact>
            <CarouselPrincipal />
            <div className="px-2 px-lg-4">
              <SwiperMovies user={user} mode="like" />
              <SwiperMovies user={user} mode="last" />
              <SwiperMovies user={user} mode="year" />
            </div>
          </Route>
          <Route path="/movie/:id">
            <MovieDetail user={user} />
          </Route>
          <Route path="/bookmarks">
            <Bookmarks user={user} />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
