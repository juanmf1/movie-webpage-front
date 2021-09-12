import { useState} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Swal from 'sweetalert2';

const LoginModal = ({ onShow, onClose, onLoginSuccess}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLogin = async () => {

    const loginUser = {
      email,
      password,
    };

    const url = "http://localhost:8000/auth";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(loginUser),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const json = await response.json();

    if (response.status === 200) {
      onLoginSuccess(json.data);
    } else {
      Swal.fire({ icon: "error", title: json.message });
    }
  };

  
  return (
    <>
      <Modal className="login-modal" show={onShow} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title >Login</Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <Form >
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
          </Form>
        </Modal.Body>

        <Modal.Footer className="moda-footer">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="warning" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LoginModal;
