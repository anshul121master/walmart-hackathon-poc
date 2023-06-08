import React, { useState, useEffect, useContext } from "react";
import "./CartPage.css";
import { CartContext } from "../context/CartContext";
import Header from "../header";
import productImage from "../../assets/images/tshirt.jpeg";
import { SignInContext } from "../context/SignInContext";
import { getOffers } from "../../utils/api";
import { UserContext } from "../context/UserContext";
import { OffersContext } from "../context/OffersContext";

const CartPage = () => {
  const { cartItems, updateQuantity } = useContext(CartContext);
  const { isSignedIn } = useContext(SignInContext);
  const { isAuthedUser } = useContext(UserContext);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setCurrentDiscount] = useState(0);
  const [nextDiscount, setNextDiscount] = useState(null);
  const { offersList, populateOfferList } = useContext(OffersContext);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const amount = cartItems.reduce(
        (total, item) => total + item.mrp * item.quantity,
        0
      );
      setTotalAmount(amount);
    };

    calculateTotalAmount();
  }, [cartItems]);

  useEffect(() => {
    let isMember = false;
    if (isSignedIn && isAuthedUser?.data?.member) isMember = true;
    getOffers(isMember).then((list) => populateOfferList(list));
  }, [isSignedIn]);

  useEffect(() => {
    const fetchAvailableDiscounts = () => {
      const discounts = [
        { id: 4, minPurchase: 0, discount: 0 },
        { id: 1, minPurchase: 50, discount: 10 },
        { id: 2, minPurchase: 100, discount: 20 },
        { id: 3, minPurchase: 150, discount: 30 },
      ];

      // Find the current and next nearest discounts based on totalAmount
      let currentDiscount = null;
      let nextDiscount = null;
      if (totalAmount > 0) {
        for (let i = 0; i < discounts.length; i++) {
          if (totalAmount >= discounts[i].minPurchase) {
            currentDiscount = discounts[i];
            if (i < discounts.length - 1) {
              nextDiscount = discounts[i + 1];
            } else
              nextDiscount = {
                offer_id: null,
                minimum_order_value: null,
                discount_percentage: 0,
              };
          } else {
            currentDiscount = {
              offer_id: null,
              minimum_order_value: null,
              discount_percentage: 0,
            };
            nextDiscount = discounts[i + 1];
            break;
          }
        }
      }
      setCurrentDiscount(currentDiscount?.discount_percentage || 0);
      setNextDiscount(nextDiscount);
    };

    fetchAvailableDiscounts();
  }, [totalAmount]);

  const handleDecreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === itemId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    updateQuantity(
      itemId,
      updatedCartItems.find((item) => item.productId === itemId).quantity
    );
  };

  const handleIncreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.productId === itemId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    console.log("updatedcart", updatedCartItems);
    updateQuantity(
      itemId,
      updatedCartItems.find((item) => item.productId === itemId).quantity
    );
  };

  return (
    <div>
      <Header cartCount={cartItems?.length} />
      <div className="cart-page">
        <div className="products-section">
          <h2 className="page-title">Cart</h2>
          <ul className="product-list">
            {cartItems.map((item) => (
              <li key={item.productId} className="product-item">
                <div className="product-details">
                  <img
                    src={productImage}
                    alt={item.productName}
                    className="product-image"
                  />
                  <div className="product-info">
                    <h3 className="product-name">{item.productName}</h3>
                    <p className="product-description">
                      {item.productDescription}
                    </p>
                    <span className="product-price">
                      ${item.mrp * item.quantity}
                    </span>
                  </div>
                </div>
                <div className="quantity-controls">
                  <button
                    className="quantity-button"
                    onClick={() => handleDecreaseQuantity(item.productId)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="product-quantity">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => handleIncreaseQuantity(item.productId)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="summary-section">
          <h2 className="summary-title">Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span className="summary-label">Total Price:</span>
              <span className="summary-value">${totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Discount:</span>
              <span className="summary-value">{discount}%</span>
            </div>
            <div className="summary-row">
              <span className="summary-label">Discounted Price:</span>
              <span className="summary-value">
                ${(totalAmount - (totalAmount * discount) / 100).toFixed(2)}
              </span>
            </div>
            {isAuthedUser?.data?.member && (
              <div className="summary-row">
                <span className="summary-label">Free Delivery</span>
              </div>
            )}
          </div>
          <div className="summary-row">
            <span className="summary-label">Next Discount:</span>
            {nextDiscount?.discount_percentage && (
              <span className="summary-value">
                Purchase ${(nextDiscount.minPurchase - totalAmount).toFixed(2)}{" "}
                or more to get {nextDiscount.discount}% off
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
