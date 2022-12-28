import {
  CartItemContainer,
  ItemDetails,
  Img,
  Span,
} from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <CartItemContainer>
      <Img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        {" "}
        <Span className="name">{name}</Span>
        <Span className="price">
          {quantity} x ${price}
        </Span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
