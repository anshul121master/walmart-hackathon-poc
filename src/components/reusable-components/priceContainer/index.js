import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const PriceLabel = styled.span`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  margin: 10px 10px 10px 0px;
  font-weight: ${(props) => props.fontWeight};
  font-family: ${(props) => props.fontFamily};
  text-decoration: ${(props) => props.textDecoration};
`;

const PriceContainer = ({ discountedPrice, mrp, discount, inStock }) => {
  return (
    <Container>
      <PriceLabel fontSize="17px" fontWeight="bold" color="#000000">
        ₹{discountedPrice}
      </PriceLabel>
      <PriceLabel
        fontSize="15px"
        fontFamily="Roboto,Arial,sans-serif"
        color="#878787"
        textDecoration="line-through"
      >
        ₹{mrp}
      </PriceLabel>
      <PriceLabel fontSize="14px" color="#388e3c" fontWeight="bold">
        {discount}% off
      </PriceLabel>
      {!inStock && (
        <PriceLabel fontSize="14px" color="#388e3c" fontWeight="bold">
          Out of Stock
        </PriceLabel>
      )}
    </Container>
  );
};

export default PriceContainer;
