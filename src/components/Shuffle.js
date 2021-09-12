import Container from "react-bootstrap/Container";

const Shuffle = () => {
  return (
    <Container fluid className="shuffle-container d-flex flex-column align-items-center justify-content-around mb-4">
      <div className="h2 div-shuffle">Do you want to discover anything interesting?</div>
      <div className="d-flex div-shuffle">
        <p className="h2">Try Shuffle!</p>
        <i class=" h1 bi bi-shuffle ms-2"></i>
      </div>
    </Container>
  );
};

export default Shuffle;
