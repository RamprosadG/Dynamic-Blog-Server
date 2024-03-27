import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  return (
    <Navbar expand="md" className="header border mt-3">
      <Container fluid>
        <div className="d-flex justify-content-start">
          <div className="me-4">
            <Link className="text-style" to="/">
              DYNAMIC BLOG
            </Link>
          </div>
          <div>
            <Link className="text-style" to="/admin/home">
              ADMIN
            </Link>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <Link to="/user/login">
            <Button variant="outline-secondary" className="me-2">
              Login
            </Button>
          </Link>
          <Link to="/user/register">
            <Button variant="outline-secondary">Register</Button>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
