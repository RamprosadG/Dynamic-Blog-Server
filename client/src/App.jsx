import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Layout/Header";
import HomePage from "./pages/common/HomePage";
import LoginPage from "./pages/common/LoginPage";
import RegisterPage from "./pages/common/RegisterPage";
import AdminPage from "./pages/admin/AdminPage";
import BlogPage from "./pages/protected/BlogPage";
import TopicPage from "./pages/protected/TopicPage";
import ErrorPage from "./pages/common/ErrorPage";
import "./styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "styled-components";
import "react-quill/dist/quill.snow.css";
import EmailVerificationPage from "./pages/common/EmailVerificationPage";

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/admin" Component={AdminPage} />
          <Route path="/blog/:id?" Component={BlogPage} />
          <Route path="/topic/:id?" Component={TopicPage} />
          <Route path="/verify/:token?" Component={EmailVerificationPage} />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
