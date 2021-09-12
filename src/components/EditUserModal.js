import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";

const EditUserModal = ({ onShow, onClose, user,modifyUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dni, setDni] = useState("");

  const url = "http://localhost:8000/user";
  

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

  useEffect(async () => {
    const response = await fetch(url, { credentials: "include" });

    const data = await response.json();

    setEmail(data[0].email);
    setPassword(data[0].password);
    setPassword2(data[0].password);
    setName(data[0].nombre);
    setSurname(data[0].apellido);
    setDni(data[0].dni);
  },[onShow]);

  const handleModifyData = async () => {
    if (password !== password2) {
      Swal.fire({
        title: "Las contraseñas no coinciden",
        icon: "error",
      });
    } else if (!password || !password2) {
      Swal.fire({
        title: "Escriba una contraseña válida",
        icon: "error",
      });
    } else {
      const modifyData = {
        email,
        password,
        name,
        surname,
        dni,
      };

      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(modifyData),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if (response.status === 200) {
        Swal.fire({ icon: "success", title: json.message });

        fetch(url, {credentials: "include"})
        .then(response=>response.json())
        .then(data=> modifyUser(`${data[0].nombre} ${data[0].apellido}`))
      } else {
        Swal.fire({ icon: "error", title: json.message });
      }
    }
  };



  return (
    <>
      {user && (
        <Modal className="edit-modal" show={onShow} onHide={onClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  value={password2}
                  onChange={handlePassword2Change}
                  type="password"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={handleNameChange}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicSurname">
                <Form.Label>Surname</Form.Label>
                <Form.Control
                  value={surname}
                  onChange={handleSurnameChange}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDni">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  value={dni}
                  onChange={handleDniChange}
                  type="text"
                  placeholder=""
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button variant="warning" onClick={handleModifyData}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default EditUserModal;
