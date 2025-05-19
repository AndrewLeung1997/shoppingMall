import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Redirect,
  useLocation,
} from "react-router-dom";
import Login from "../Login";
import MultiStepRegistration from "../Registration";

export default function App() {
  return (
    <Router>
      <Routes>
       <Route path="/login" element={<Login />} />
        <Route path="/register" element={<MultiStepRegistration />} />
        <Route path="*" element={<Login />} /> {/* 預設導向登入 */}
      </Routes>
    </Router>
  );
}
