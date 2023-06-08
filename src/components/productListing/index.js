import React, { useState, useEffect, useContext } from "react";
import ProductCard from "./ProductCard";
// import productList from "../../data-dump/productList.json";
import styled from "styled-components";
import Header from "../header";
import { CartContext } from "../context/CartContext";
import { ProductListContext } from "../context/ProductListContext";
import { getAllProducts } from "../../utils/api";

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 40px;
  border: 2px solid #f3eeee;
  margin-top: 130px;
  padding: 30px;
  background-color: #fbfafa;
`;
const ProductListingPage = () => {
  const { cartItems } = useContext(CartContext);
  const { productList, populateProductList } = useContext(ProductListContext);
  // const [ productList, setProductList ] = useState(productList);

  useEffect(() => {
    if (!productList?.data?.length) {
      getAllProducts().then((list) => populateProductList(list));
    }
  }, []);

  return (
    <div>
      <Header cartCount={cartItems?.length} />
      <ProductContainer>
        {productList?.data?.map((product) => (
          <ProductCard key={product.productId} productData={product} />
        ))}
      </ProductContainer>
    </div>
  );
};

export default ProductListingPage;
