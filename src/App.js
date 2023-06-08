import "./App.css";
import ProductDetailPage from "./components/productDetails";
import ProductListingPage from "./components/productListing";
import SignIn from "./components/signIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider} from "./components/context/CartContext";
import { LoaderProvider } from "./components/context/LoaderContext";
import { SignInProvider } from "./components/context/SignInContext";
import { UserProvider } from "./components/context/UserContext";
import { ProductListProvider } from "./components/context/ProductListContext";
import { OfferListProvider } from "./components/context/OffersContext";
import { useState, useEffect } from "react";
import CartPage from "./components/cart";

function App() {
  return (
    <OfferListProvider>
    <ProductListProvider>
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
    </ProductListProvider>
    </OfferListProvider>
  );
}

export default App;
