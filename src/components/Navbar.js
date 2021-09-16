import { useState, useEffect } from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "react-router-dom/Link";
import SearchCanvas from "./SearchCanvas";
import Button from "react-bootstrap/Button";

const Navigationbar = ({
  user,
  onLogout,
  onShowLoginModal,
  onShowSignupModal,
  onShowEditUserModal,
}) => {
  // Busqueda
  const [query, setQuery] = useState(null);

  const [showSearchCanvas, setShowSearchCanvas] = useState(null);

  const handleShowSearchCanvas = () => {
    setShowSearchCanvas(true);
  };

  const handleCloseSearchCanvas = () => {
    setShowSearchCanvas(false);
    setQuery(null);
  };

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <>
      <Navbar
        sticky="top"
        variant="dark"
        className="px-4 py-3 navbar-custom"
        expand="lg"
      >
        <Navbar.Brand className="item-navbar">
          <Link to="/" className="text-white text-decoration-none">
            <img src ="../images/movie.png"/>
            Proyecto Final
          </Link>
        </Navbar.Brand>
        {user ? (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              className="justify-content-center"
              id="basic-navbar-nav"
            >
              <Nav className="ms-auto align-items-center">
                <Nav.Link
                  className="px-3 d-none d-lg-block"
                  onClick={handleShowSearchCanvas}
                  href=""
                >
                  <i className="bi bi-search"></i>
                </Nav.Link>
                <Button
                  className="w-100 mt-3 d-lg-none search-button"
                  onClick={handleShowSearchCanvas}
                >
                  Search
                </Button>
                <Link className="text-decoration-none">
                  <Nav.Link className="" href="">
                    <i className="bi bi-shuffle me-1"></i> Discover a new title
                  </Nav.Link>
                </Link>
                <Nav.Link className="" href="">
                  <Link className="text-decoration-none" to="/bookmarks">
                    <i className="bi bi-bookmark-star-fill me-1"></i> Bookmarks
                  </Link>
                </Nav.Link>
                <NavDropdown
                  align="end"
                  menuVariant="dark"
                  title={user}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item onClick={onShowEditUserModal}>
                    Modify Information
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={onLogout}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </>
        ) : (
          <div className="ms-auto">
            <Button
              onClick={onShowSignupModal}
              variant="secondary"
              className="me-2 px-3"
            >
              Sign up
            </Button>
            <Button
              onClick={onShowLoginModal}
              variant="warning"
              className="me-2 px-3"
            >
              Log In
            </Button>
          </div>
        )}
      </Navbar>

      <SearchCanvas
        show={showSearchCanvas}
        close={handleCloseSearchCanvas}
        query={query}
        handleQueryChange={handleQueryChange}
      />
    </>
  );
};

export default Navigationbar;
