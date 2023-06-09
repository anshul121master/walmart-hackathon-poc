import React, { useState, useEffect, useContext } from "react";
import "./CartPage.css";
import { CartContext } from "../context/CartContext";
import Header from "../header";
import { SignInContext } from "../context/SignInContext";
import { getOffers } from "../../utils/api";
import { UserContext } from "../context/UserContext";
import { OffersContext } from "../context/OffersContext";
import styled from "styled-components";
import PriceContainer from "../reusable-components/priceContainer";
import { Button } from "@material-ui/core";
import { ProductBrandName, ProductTitle } from "../productDetails";
import { calcDiscount } from "../reusable-components/priceContainer";
import { hostUrl } from "../../config/apiConfig";
import { Grid, Typography } from "@material-ui/core";

const CartPage = () => {
  const { cartItems, updateQuantity } = useContext(CartContext);
  const { isSignedIn } = useContext(SignInContext);
  const { authedUser } = useContext(UserContext);
  const [totalMrp, setTotalMrp] = useState(0);
  const [totalDiscountOnMrp, setTotalDiscountOnMrp] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discount, setCurrentDiscount] = useState(0);
  const [nextDiscount, setNextDiscount] = useState(null);
  const { offersList, populateOfferList } = useContext(OffersContext);

  useEffect(() => {
    const calculateTotalMrp = () => {
      const amount = cartItems.reduce(
        (total, item) => total + item.mrp * item.quantity,
        0
      );
      setTotalMrp(amount);
    };

    calculateTotalMrp();
  }, [cartItems]);

  useEffect(() => {
    const calculateTotalDiscount = () => {
      const totalDiscount = cartItems.reduce(
        (total, item) =>
          total +
          calcDiscount(item.mrp * item.quantity, item.discountPercentage),
        0
      );
      setTotalDiscountOnMrp(totalDiscount);
    };

    calculateTotalDiscount();
  }, [cartItems]);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const totalAmt = totalMrp - totalDiscountOnMrp;
      setTotalAmount(totalAmt);
    };

    calculateTotalAmount();
  }, [totalMrp, totalDiscountOnMrp]);

  useEffect(() => {
    let isMember = false;
    if (isSignedIn && authedUser?.data?.member) isMember = true;
    getOffers(isMember).then((offers) => populateOfferList(offers));
  }, [isSignedIn]);

  useEffect(() => {
    const calcOfferDiscount = () => {
      // Find the current and next nearest discounts based on totalMrp
      let currentDiscount = null;
      let nextDiscount = null;
      const list = offersList?.data;
      if (list && list.length > 0) {
        for (let i = 0; i < list.length; i++) {
          if (totalAmount >= list[i].minimum_order_value) {
            currentDiscount = list[i];
            if (i < list.length - 1) {
              nextDiscount = list[i + 1];
            } else
              nextDiscount = {
                offer_id: null,
                minimum_order_value: null,
                discount_percentage: 0,
              };
          } else {
            if (i === 0) {
              currentDiscount = {
                offer_id: null,
                minimum_order_value: null,
                discount_percentage: 0,
              };
              nextDiscount = list[i];
              break;
            }
          }
        }
      }
      setCurrentDiscount(currentDiscount?.discount_percentage || 0);
      setNextDiscount(nextDiscount);
    };
    if (Object.keys(offersList).length !== 0) {
      calcOfferDiscount();
    }
  }, [totalAmount, offersList]);

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
    updateQuantity(
      itemId,
      updatedCartItems.find((item) => item.productId === itemId).quantity
    );
  };
  const FreeServiceMsg = ({ totalAmount }) => {
    let msg = "";
    if (totalAmount < 100)
      msg = `Add $${Math.ceil(100 - totalAmount)} for Free Shipping`;
    else if (totalAmount >= 100 && totalAmount <= 150)
      msg = `Free shipping available. Add $${Math.ceil(
        150 - totalAmount
      )} for free delivery`;
    else msg = `Free Shipping, Free Delivery`;
    return (
      <Grid item xs={6}>
        <Typography style={{color: "green", fontWeight: "bold"}}>{msg}</Typography>
      </Grid>
    );
  };

  const ProductList = styled.ul`
    border: 2px solid #dfe3e5;
    list-style: none;
    padding: 10px;
    min-width: 60%;
    margin-right: 30px;
  `;
  const Item = styled.li`
    padding: 5px;
  `;
  const ProductDetails = styled.div`
    display: flex;
    justify-content: space-between;
  `;
  const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 30px;
    margin-right: 30px;
  `;
  const QuantityControls = styled.div`
    display: flex;
    align-items: center;
  `;
  const QunatityControlButton = styled(Button)`
    && {
      padding: 5px;
      border: 2px solid #d1d5d6;
      border-radius: 50px;
      color: black;
      background-color: #e4ecee;
      font-weight: bold;
    }
  `;
  const ProductQunatityLabel = styled.span`
    margin-left: 5px;
    margin-right: 5px;
  `;
  const Container = styled.div`
    margin-top: 50px;
    display: flex;
  `;
  return (
    <>
      <Header cartCount={cartItems?.length} />
      <h2 className="page-title">Cart</h2>
      <Container>
        <ProductList className="product-list">
          {cartItems.map((item) => (
            <Item key={item.productId} className="product-item">
              <ProductDetails>
                <img
                  src={hostUrl + item.imgUrl}
                  alt={item.productName}
                  height="200px"
                  width="200px"
                />
                <ProductInfo>
                  <ProductBrandName>{item.brandName}</ProductBrandName>
                  <ProductTitle className="product-name">
                    {item.productName}
                  </ProductTitle>
                  <PriceContainer
                    mrp={item.mrp * item.quantity}
                    discount={item.discountPercentage}
                    inStock={true}
                  />
                </ProductInfo>
                <QuantityControls>
                  <QunatityControlButton
                    onClick={() => handleDecreaseQuantity(item.productId)}
                    disabled={item.quantity === 1}
                  >
                    -
                  </QunatityControlButton>
                  <ProductQunatityLabel>{item.quantity}</ProductQunatityLabel>
                  <QunatityControlButton
                    onClick={() => handleIncreaseQuantity(item.productId)}
                  >
                    +
                  </QunatityControlButton>
                </QuantityControls>
              </ProductDetails>
            </Item>
          ))}
        </ProductList>

        <Grid container spacing={3} style={{border: "2px solid #dfe3e5"}}>
          <Grid item xs={12}>
            <Typography variant="h5" style={{ fontWeight: "bold" }}>
              Price Details
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Total Mrp:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>${Math.ceil(totalMrp)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Discount:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>-${Math.ceil(totalMrp - totalAmount)}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{fontWeight: "bold"}}>Total Amount:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>${Math.ceil(totalAmount)}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{color: "green", fontWeight: "bold"}}>Offer Applied</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>Offer Discount:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{discount}%</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{fontWeight: "bold"}}>Final Price:</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography style={{fontWeight: "bold"}}>
              ${Math.ceil(totalAmount - (totalAmount * discount) / 100)}
            </Typography>
          </Grid>
          {authedUser?.data?.success && authedUser?.data?.member ? (
            <Grid item xs={6}>
              <Typography>
                ${Math.ceil(totalAmount - (totalAmount * discount) / 100)}
              </Typography>
            </Grid>
          ) : (
            <FreeServiceMsg totalAmount={totalAmount} />
          )}

          {nextDiscount?.discount_percentage && (
            <Grid item xs={12} style={{backgroundColor: "#D3F5A2", color: "green"}}>
              <Typography style={{fontWeight: "bold"}}>
                Purchase $
                {Math.ceil(nextDiscount.minimum_order_value - totalAmount)} or
                more to get {nextDiscount.discount_percentage}% off
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

export default CartPage;
