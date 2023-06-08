import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import productImage from "../../assets/images/tshirt.jpeg";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Header from "../header";
import styled from "styled-components";
import PriceContainer from "../reusable-components/priceContainer";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    margin: "130px 40px",
  },
  imageContainer: {
    display: "flex",
    borderRight: "3px solid #EFECEC",
    justifyContent: "center",
    alignItems: "center",
  },
  productDetailsContainer: {
    width: "50%",
    padding: theme.spacing(2),
    boxShadow: "0 6px 10px 0 rgb(125 125 125 / 10%)",
    backgroundColor: "#FEFAFA",
  },
  btnStyle: {
    backgroundColor: "green",
    borderRadius: 2,
    width: "40%",
    height: "55px",
    marginRight: "15px",
    "&:hover": {
      backgroundColor: "green",
    },
    color: "#FFFFFF",
    fontWeight: "bold",
    boxShadow: "none",
  },
  btnStyleWishlist: {
    backgroundColor: "#F8F8F8",
    borderRadius: 2,
    width: "40%",
    height: "55px",
    marginRight: "15px",
    "&:hover": {
      backgroundColor: "#F8F8F8",
    },
    border: "2px solid #D7D3D3",
    color: "#000000",
    fontWeight: "bold",
    boxShadow: "none",
  },
  cardStyle: {
    minWidth: 400,
    minHeight: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ProductBrandName = styled(Typography)`
  && {
    color: #000000;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
const ProductTitle = styled(Typography)`
  && {
    color: #878787;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 5px;
  margin-top: 10px;
`;
const ProductDescription = styled.section`
  border: 2px solid red;
  padding: 3px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
export default function ProductDetails(props) {
  const { cartItems, addToCart } = useContext(CartContext);
  console.log("cartItems=>", cartItems)
  const location = useLocation();
  const navigate = useNavigate();
  const productData = location.state?.productData;
  const classes = useStyles();
  const {
    productId,
    productName,
    productDescription,
    imgUrl,
    brandName,
    mrp,
    discountPercentage,
    inStock,
    productCategory,
  } = productData;
  const discountedPrice = location.state?.discountedPrice;
  const handleAddToWishlist = () => {};
  const isProductPresentInCart = (productId) => {
    if (cartItems.find((item) => item.productId === productId)) return true;
    return false;
  };
  return (
    <>
      <Header cartCount={cartItems?.length} />
      <div className={classes.container}>
        <div className={classes.imageContainer}>
          <img src={productImage} alt="product-img" width="70%" height="100%" />
        </div>
        <div className={classes.productDetailsContainer}>
          <ProductBrandName>{brandName}</ProductBrandName>
          <ProductTitle>{productName}</ProductTitle>
          <PriceContainer
            discountedPrice={discountedPrice}
            mrp={mrp}
            discount={discountPercentage}
            inStock={inStock}
          />
          <h1 style={{fontSize: 20}}>Description</h1>
          <ProductDescription>{productDescription}</ProductDescription>
          <ButtonWrapper>
            {isProductPresentInCart(productData.productId) ? (
              <Button
                onClick={() => navigate("/cart")}
                variant="contained"
                className={classes.btnStyle}
                color="secondary"
              >
                Go to Cart
              </Button>
            ) : (
              <Button
                onClick={() => addToCart(productData)}
                variant="contained"
                className={classes.btnStyle}
                color="secondary"
                disabled={!inStock}
              >
                Add to Cart
              </Button>
            )}
            <Button
              onClick={handleAddToWishlist}
              variant="contained"
              color="secondary"
              className={classes.btnStyleWishlist}
            >
              Wishlist
            </Button>
          </ButtonWrapper>
        </div>
      </div>
    </>
  );
}
