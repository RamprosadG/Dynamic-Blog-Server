import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { useContext } from "react";

const Header = () => {
  return (
    <Navbar expand="md" className="header-style border mt-3">
      <Container>
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
            <Button variant="outline-secondary">Login</Button>
          </Link>

          <div className="d-flex justify-content-start header-text-style">
            <div className="me-2"> Hello, Ramprosad</div>
            <div>
              <Button variant="outline-secondary">Logout</Button>
            </div>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
