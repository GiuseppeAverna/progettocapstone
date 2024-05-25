import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ProductPage from "./Components/ProductPage";
import CartPage from "./Components/CartPage";
import ProductDetailPage from "./Components/ProductDetailPage";
import Footer from "./Components/Footer";
import ChatSupport from "./Components/ChatSupport";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { PaymentPage } from "./Components/PaymentPage";

function App() {
  return (
    <BrowserRouter>
      <div className="wallpaper" />
      <div className="website-container">
        <ChatSupport />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<HomePage />} path="/home" />
          <Route element={<ProductPage />} path="/products" />
          <Route element={<CartPage />} path="/cart" />
          <Route element={<ProductDetailPage />} path="/products/:productId" />
          <Route element={<PaymentPage />} path="/payment" />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
