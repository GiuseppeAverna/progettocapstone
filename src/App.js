import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ProductPage from "./Components/ProductPage";
import CartPage from "./Components/CartPage";
import ProductDetailPage from "./Components/ProductDetailPage";
import Footer from "./Components/Footer";
import ChatSupport from "./Components/ChatSupport";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="wallpaper" />
      <div className="website-container">
        <ChatSupport />
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<HomePage />} path="/home" />
          <Route element={<ProductPage />} path="/products" />
          <Route element={<CartPage />} path="/cart" />
          <Route element={<ProductDetailPage />} path="/products/:productId" />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
