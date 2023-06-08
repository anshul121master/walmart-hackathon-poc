import "./App.css";
import ProductDetailPage from "./components/productDetails";
import ProductListingPage from "./components/productListing";
import SignIn from "./components/signIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider} from "./components/context/CartContext";
import { LoaderProvider } from "./components/context/LoaderContext";
import { SignInProvider } from "./components/context/SignInContext";
import { UserProvider } from "./components/context/UserContext";
import { useState, useEffect } from "react";
import CartPage from "./components/cart";

function App() {
  return (
    <CartProvider>
      <SignInProvider>
        <UserProvider>
        <LoaderProvider>
    <Router>
      <Routes>
        <Route path="/" element={<ProductListingPage />} />
        <Route path="/ip/:id" element={<ProductDetailPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
    </LoaderProvider>
    </UserProvider>
    </SignInProvider>
    </CartProvider>
  );
}

export default App;
