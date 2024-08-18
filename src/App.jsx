import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductPage from "./components/productPage";
import CartPage from "./components/cartPage";
import ProductDetails from "./components/productDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/mycart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </div>
  );
}

export default App;
