import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout"
import Form from "./pages/Form";
import Map from "./pages/Map";
import React from "react";

export default function App() {
  return (
    <React.StrictMode>
      <Map />
      <Form />
    </React.StrictMode>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);