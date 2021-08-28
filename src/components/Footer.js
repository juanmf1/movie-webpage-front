import Container from "react-bootstrap/Container";

const Footer = () => {
  return (
    <Container fluid className="p-4 footer-container d-flex flex-column flex-md-row justify-content-center align-items-center">
      <div className="footer-right m-2">
        <p>Juan Manuel Fernandez. 2021 |</p>
      </div>
      <div className="footer-social mx-2 d-flex align-items-center">
        <a href="https://github.com/juanmf1" target="_blank"><i className="bi bi-github mx-2"></i></a>
        <a href="https://www.instagram.com/juan.mf1/" target="_blank"><i className="bi bi-instagram mx-2"></i></a>
        <a href="https://www.facebook.com/JuuanMFernandez" target="_blank"><i className="bi bi-facebook mx-2"></i></a>
        <a href="https://wa.me/541140410915" target="_blank"><i className="bi bi-whatsapp mx-2"></i></a>
      </div>
    </Container>
  );
};

export default Footer;
