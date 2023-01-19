import {
  CheckoutItemCont,
  ImgContainer,
  Img,
  Span,
  Arrow,
  Value,
} from "./checkout-vignette.styles.jsx";

import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";

import { selectCartItems } from "../../store/cart/cart.selector.js";
import { useDispatch, useSelector } from "react-redux";

const Vignette = ({ product }) => {
  console.log("vignette:", product);

  const { imageUrl, name, quantity, price } = product;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const removeHandler = () => {
    console.log("remove");
    dispatch(removeItemFromCart(cartItems, product));
  };
  const addHandler = () => {
    console.log("add");
    dispatch(addItemToCart(cartItems, product));
  };

  const totalRemoveHandler = () => {
    console.log("total remove");
    dispatch(clearItemFromCart(cartItems, product));
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
