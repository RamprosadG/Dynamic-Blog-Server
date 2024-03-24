import React from "react";
import { Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Nav className="bg-success py-3">
      <Nav.Item>
        <Nav.Link className="text-warning" href="/admin/home">
          Admin
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="text-warning" href="/">
          User
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default Header;
