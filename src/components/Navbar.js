import {useState, useEffect} from'react';

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Link from "react-router-dom/Link";
import SearchCanvas from './SearchCanvas';

const Navigationbar = () => {
  const [query, setQuery] = useState(null);

  const [showSearchCanvas, setShowSearchCanvas]=useState(null);

  const handleShowSearchCanvas = () =>{
    setShowSearchCanvas(true);
  }

  const handleCloseSearchCanvas = () =>{
    setShowSearchCanvas(false);
    setQuery(null)
  }

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };


  return (
    <>
    <Navbar sticky="top" className="px-4 py-3 navbar-custom" expand="lg">
      <Navbar.Brand className="item-navbar">
        <Link to="/" className="text-white text-decoration-none">
          Proyecto Final
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link className="px-3" onClick={handleShowSearchCanvas} href="">
            <i className="bi bi-search"></i>
          </Nav.Link>
          <Link className="text-decoration-none">
            <Nav.Link className="" href="">
              <i className="bi bi-shuffle me-1"></i> Aleatorio
            </Nav.Link>
          </Link>
          <Nav.Link className="" href="">
            <i className="bi bi-bookmark-star-fill me-1"></i> Favoritos
          </Nav.Link>
          <Nav.Link href="">
            <i className="bi bi-clock-fill me-1"></i> Historial
          </Nav.Link>


          <NavDropdown
            align="end"
            menuVariant="dark"
            title="Usuario"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
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
