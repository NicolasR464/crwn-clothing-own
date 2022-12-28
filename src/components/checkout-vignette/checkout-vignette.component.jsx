import {
  CheckoutItemCont,
  ImgContainer,
  Img,
  Span,
  Arrow,
  Value,
} from "./checkout-vignette.styles.jsx";

import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

const Vignette = ({ product }) => {
  console.log("vignette:", product);
  const { addQuantityToProduct, removeItemToCart, totalRemove } =
    useContext(CartContext);
  const { imageUrl, name, quantity, price } = product;

  const removeHandler = () => {
    console.log("remove");
    removeItemToCart(product);
  };
  const addHandler = () => {
    console.log("add");
    addQuantityToProduct(product);
  };

  const totalRemoveHandler = () => {
    console.log("total remove");
    totalRemove(product);
  };

  return (
    <CheckoutItemCont>
      <ImgContainer>
        <Img src={imageUrl} alt={name}></Img>
      </ImgContainer>
      <Span className="name">{name}</Span>
      <Span className="quantity">
        <Arrow className="arrow" onClick={removeHandler}>
          &#10094;
        </Arrow>
        <Value className="value">{quantity}</Value>

        <Arrow className="arrow" onClick={addHandler}>
          &#10095;
        </Arrow>
      </Span>
      <Span className="price">{price}</Span>

      <Span onClick={totalRemoveHandler}>&#10005;</Span>
    </CheckoutItemCont>
  );
};

export default Vignette;
