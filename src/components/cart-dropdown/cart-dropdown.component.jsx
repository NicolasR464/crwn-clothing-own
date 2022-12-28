import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DropContainer, CartItems } from "./cart-dropdown.styles.jsx";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import { CartContext } from "../../contexts/cart.context";

const CartDropdown = () => {
  const navigate = useNavigate();
  const goToCheckOutHandler = () => {
    navigate("/checkout");
  };
  const { cartItems } = useContext(CartContext);
  console.log({ cartItems });
  return (
    <DropContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem}></CartItem>
          ))
        ) : (
          <span>Your cart is empty</span>
        )}
      </CartItems>
      <Button onClick={goToCheckOutHandler}>checkout</Button>-
    </DropContainer>
  );
};

export default CartDropdown;
