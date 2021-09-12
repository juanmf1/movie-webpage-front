import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import Swal from "sweetalert2";

const SingupModal = ({ onShow, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dni, setDni] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePassword2Change = (event) => {
    setPassword2(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSurnameChange = (event) => {
    setSurname(event.target.value);
  };

  const handleDniChange = (event) => {
    setDni(event.target.value);
  };

  const handleSignup = async () => {
    if (password !== password2) {
      Swal.fire({ icon: "error", title: "Las contraseñas no coinciden" });
    } else if (!password || !password2) {
      Swal.fire({ icon: "error", title: "Escriba una contraseña válida" });
    } else {
      const signupUser = {
        email,
        password,
        name,
        surname,
        dni,
      };

      const url = "http://localhost:8000/user";

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(signupUser),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (response.status === 200) {
        Swal.fire({ icon: "success", title: json.message });
      } else {
        Swal.fire({ icon: "error", title: json.message });
      }
    }
  };

  return (
    <>
      <Modal className="signup-modal" show={onShow} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                value={email}
                onChange={handleEmailChange}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={password}
                onChange={handlePasswordChange}
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                value={password2}
                onChange={handlePassword2Change}
                type="password"
                placeholder="Enter password"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                onChange={handleNameChange}
                type="text"
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicSurname">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                value={surname}
                onChange={handleSurnameChange}
                type="text"
                placeholder="Enter surname"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicDni">
              <Form.Label>DNI</Form.Label>
              <Form.Control
                value={dni}
                onChange={handleDniChange}
                type="text"
                placeholder="Enter dni"
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleSignup}>
            Signup
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SingupModal;
