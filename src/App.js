import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ProductPage from "./Components/ProductPage";
import CartPage from "./Components/CartPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HomePage />} path="/" />
          <Route element={<ProductPage />} path="/products" />
          <Route element={<CartPage />} path="/cart" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
