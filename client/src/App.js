import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Cart from "./pages/cart/Cart";
import Profile from "./pages/profile/Profile";
import Payment from "./pages/payment/Payment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-detail/:prdid" element={<ProductDetail />} />
        <Route path="/cart/:uid" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/user/:userId" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
