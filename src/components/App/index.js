import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Redirect,
  useLocation,
} from "react-router-dom";
import Login from "../Login";
import MultiStepRegistration from "../Registration";
import HomePage from "../Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<MultiStepRegistration />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<Login />} /> {/* 預設導向登入 */}
      </Routes>
    </BrowserRouter>
  );
}
