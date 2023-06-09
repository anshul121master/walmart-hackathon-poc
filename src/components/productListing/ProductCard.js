import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import PriceContainer from "../reusable-components/priceContainer";
import { hostUrl } from "../../config/apiConfig" ;

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
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link
        style={{ textDecoration: "none" }}
        to={`/ip/${productId}`}
        state={{ productData }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            image={`${hostUrl+imgUrl}`}
            alt="clothing-tshirts"
          />
          <CardContent>
            <ProductName>{brandName}</ProductName>
            <ProductCategory>
             {productName}
            </ProductCategory>
            <PriceContainer mrp={mrp} discount={discountPercentage} inStock={inStock} />
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
