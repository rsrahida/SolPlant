import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import BlogPage from "./pages/BlogPage";
import ContactPage from "./pages/ContactPage";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./shared/Footer/Footer";
import CartPage from "./pages/CartPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import LoginPage from "./pages/LoginPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import OrderSummeryPage from "./pages/OrderSummeryPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import PaymentPage from "./pages/PaymentPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/about" element={<AboutPage />}></Route>
          <Route path="/product" element={<ProductPage />}></Route>
          <Route path="/blog" element={<BlogPage />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route
            path="/changePassword"
            element={<ChangePasswordPage />}
          ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/orderDetails" element={<OrderDetailsPage />}></Route>
          <Route path="/orderSummery" element={<OrderSummeryPage />}></Route>
          <Route path="/orderTracking" element={<OrderTrackingPage />}></Route>
          <Route path="/payment" element={<PaymentPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/signUp" element={<SignUpPage />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
