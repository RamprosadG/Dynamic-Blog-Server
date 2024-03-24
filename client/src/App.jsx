import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminHome from "./pages/admin/Home";
import AdminBlog from "./pages/admin/Blog";
import UserHome from "./pages/user/Home";
import UserBlog from "./pages/user/Blog";
import AdminTopic from "./pages/admin/Topic";
import Error from "./pages/user/Error";
import { Container, Nav } from "react-bootstrap";
import Header from "./components/Layout";
import LoginPage from "./pages/user/Login";
import RegisterPage from "./pages/user/Register";

const App = () => {
  return (
    <>
      <Container>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={UserHome} />
            <Route path="/user/blog" Component={UserBlog} />
            <Route path="/user/login" Component={LoginPage} />
            <Route path="/user/register" Component={RegisterPage} />
            <Route path="/admin/home" Component={AdminHome} />
            <Route path="/admin/blog" Component={AdminBlog} />
            <Route path="/admin/topic" Component={AdminTopic} />
            <Route path="*" Component={Error} />
          </Routes>
        </BrowserRouter>
      </Container>
    </>
  );
};

export default App;
