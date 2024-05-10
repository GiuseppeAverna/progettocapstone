import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import ProductPage from "./Components/ProductPage";
import CartPage from "./Components/CartPage";
import ProductDetailPage from "./Components/ProductDetailPage";
import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Scarpe da corsa",
      description: "Scarpe da corsa molto leggere e traspiranti primo",
      price: 59.99,
      imageUrl: "https://via.placeholder.com/300x200?text=Scarpe+da+corsa",
    },
  ]);

  // Carica il carrello dal localStorage all'avvio dell'applicazione
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // Salva il carrello nel localStorage ogni volta che viene modificato
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route
          element={<ProductPage products={products} addToCart={addToCart} />}
          path="/products"
        />
        <Route
          element={<CartPage cart={cart} removeFromCart={removeFromCart} />}
          path="/cart"
        />
        <Route
          element={
            <ProductDetailPage products={products} addToCart={addToCart} />
          }
          path="/products/:productId"
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
