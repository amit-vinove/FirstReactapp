import React, { useState } from "react";
import ReactDOM from "react-dom";
import HomePage from "./Home/home";
import LoginPage from "./login/login";
import ProfilePage from "./Profile/profile";
import TodoPage from "./Todo/todo";
import indexCss from "./css/index.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EmployeePage from "./Employee/employee";
import TeamsPage from "./Teams/teams";
import AvatarPage from "./Todo/avatarBar";

function getAuth() {
  const loggedIn = localStorage.getItem("LoggedIn");
  if (loggedIn == "true") {
    return true;
  } else {
    return false;
  }
}

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = getAuth();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}
function App() {
  const loggedUsername = localStorage.getItem("User");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} activeClassName="active" />
      </Routes>
      <Routes>
        <Route
          path="/home"
          element={
            <RequireAuth redirectTo="/">
              <HomePage />
            </RequireAuth>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/profile"
          element={
            <RequireAuth redirectTo="/">
              <ProfilePage />
            </RequireAuth>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/employee"
          element={
            <RequireAuth redirectTo="/">
              <EmployeePage />
            </RequireAuth>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/teams"
          element={
            <RequireAuth redirectTo="/">
              <TeamsPage />
            </RequireAuth>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/todo"
          element={              
          <TodoPage />
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/avatarPage"
          element={              
          <AvatarPage />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
