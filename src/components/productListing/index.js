import React, {useContext} from 'react';
import ProductCard from './ProductCard';
import productList from '../../data-dump/productList.json';
import styled from 'styled-components';
import Header from "../header";
import { CartContext } from "../context/CartContext";

const ProductContainer = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
grid-gap: 40px;
border: 2px solid #F3EEEE;
margin-top: 130px;
padding: 30px;
background-color: #FBFAFA;
`
const ProductListingPage = () => {
  const { cartItems } = useContext(CartContext);
  const products = productList;

  return (
    <div>
    <Header cartCount={cartItems?.length}/>
    <ProductContainer>
      {products.map(product => <ProductCard key={product.id} productData={product} />)}
    </ProductContainer>
    </div>
  );
};

export default ProductListingPage;
