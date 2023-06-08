import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import productImage from "../../assets/images/tshirt.jpeg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PriceContainer from "../reusable-components/priceContainer";

const ProductName = styled(Typography)`
  && {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    color: #000000;
  }
`;
const ProductCategory = styled(Typography)`
  && {
    color: #878787;
    font-size: 14px;
    font-weight: 500;
  }
`;

export default function ProductCard({ productData }) {
  const { productId, productName, imgUrl, mrp, discountPercentage, brandName, inStock } = productData;
  const discountedPrice = mrp - (mrp * discountPercentage) / 100;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link
        style={{ textDecoration: "none" }}
        to={`/ip/${productId}`}
        state={{ productData, discountedPrice }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={productImage}
            alt="clothing-tshirts"
          />
          <CardContent>
            <ProductName>{brandName}</ProductName>
            <ProductCategory>
             {productName}
            </ProductCategory>
            <PriceContainer discountedPrice={discountedPrice} mrp={mrp} discount={discountPercentage} inStock={inStock} />
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
