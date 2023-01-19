import { CartIconContainer, ShopIcon, Span } from "./cart-icon.styles.jsx";

import { useSelector, useDispatch } from "react-redux";

import { setIsCartOpen } from "../../store/cart/cart.action";

import {
  selectIsCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector";

const CartIcon = () => {
  // const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  // useEffect(() => {
  //   toggleIsCartOpen();
  // }, []);

  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShopIcon className="shopping-icon" />
      <Span>{cartCount}</Span>
    </CartIconContainer>
  );
};
export default CartIcon;
