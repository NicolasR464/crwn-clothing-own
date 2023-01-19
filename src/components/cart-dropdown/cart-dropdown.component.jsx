import { useNavigate } from "react-router-dom";
import { DropContainer, CartItems } from "./cart-dropdown.styles.jsx";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { selectCartItems } from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";

const CartDropdown = () => {
  const navigate = useNavigate();
  const goToCheckOutHandler = () => {
    navigate("/checkout");
  };

  const cartItems = useSelector(selectCartItems);
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
