import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./layout/Header";
// import Biconomy from "./utils/biconomy";

const Routing: React.FC = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/bico" element={<Biconomy />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Routing;