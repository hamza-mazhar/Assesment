import React from "react";
import Router from "./Router";
import Navbar from "./components/navbar";
import "./App.css";
import "antd/es/layout/style/index.css";
import "antd/es/breadcrumb/style/index.css";
import "antd/dist/antd.css";

function App() {
  return (
    <>
      <Navbar />
      <Router />
    </>
  );
}

export default App;
