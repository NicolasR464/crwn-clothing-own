import Vignette from "../../components/checkout-vignette/checkout-vignette.component";
import {
  CheckoutCont,
  CheckoutHeader,
  HeaderBlock,
  Span,
} from "./checkout.styles.jsx";

import {
  selectCartItems,
  selectCartTotal,
} from "../../store/cart/cart.selector";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  console.log({ cartItems });

  return (
    <CheckoutCont>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span></span>Description
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Remove</span>
        </HeaderBlock>
      </CheckoutHeader>
      {cartItems.map((item) => {
        const { id } = item;
        return <Vignette key={id} product={item} />;
      })}
      <Span>Total: ${cartTotal} </Span>
    </CheckoutCont>
  );
};

export default Checkout;
