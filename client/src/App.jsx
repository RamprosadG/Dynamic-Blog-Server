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
          <Route path="/blog/:option" Component={BlogPage} />
          <Route path="/topic/:option" Component={TopicPage} />
          <Route path="*" Component={ErrorPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
