import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import RegistrationPage from "./pages/RegistrationPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import Navbar from "./shared/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import AddProductsPage from "./pages/AddProductsPage";
import ManageProductsPage from "./pages/ManageProductsPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import DashboardChartPage from "./pages/DashboardChartPage";
import ManageUsersPage from "./pages/ManageUsersPage";
import BasketPage from "./pages/BasketPage";
import WishListPage from "./pages/WishListPage";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/products" element={<ProductsPage />}></Route>
          <Route path="/registration" element={<RegistrationPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
              path="/products/addproducts"
              element={<AddProductsPage />}
            ></Route>
            <Route
              path="/dashboard/products"
              element={<ManageProductsPage />}
            ></Route>
            <Route
              path="/dashboard/dashboardchart"
              element={<DashboardChartPage />}
            ></Route>
            <Route
              path="/dashboard/manageusers"
              element={<ManageUsersPage />}
            ></Route>
          </Route>
          <Route path="/basket" element={<BasketPage />}></Route>
          <Route path="/wishlist" element={<WishListPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
