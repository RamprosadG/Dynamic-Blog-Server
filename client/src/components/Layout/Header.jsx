import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar expand="md" className="header-style border mt-3">
      <Container fluid>
        <div className="d-flex justify-content-start">
          <div className="me-4">
            <Link className="header-text-style" to="/">
              DYNAMIC BLOG
            </Link>
          </div>
          <div>
            <Link className="header-text-style" to="/admin">
              ADMIN
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <Link to="/login">
            <Button variant="outline-secondary" className="me-2">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="outline-secondary">Register</Button>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
