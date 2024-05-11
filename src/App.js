import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ProductPage from "./Components/ProductPage";
import CartPage from "./Components/CartPage";
import ProductDetailPage from "./Components/ProductDetailPage";
import { useState, useEffect } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => {
        console.error("Problema con la fetch ", error);
      });
  }, []);

  return (
    <BrowserRouter>
      <div className="wallpaper" />
      <div className="website-container">
        <Header />
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route
            element={<ProductPage products={products} />}
            path="/products"
          />
          <Route element={<CartPage />} path="/cart" />
          <Route
            element={<ProductDetailPage products={products} />}
            path="/products/:productId"
          />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
