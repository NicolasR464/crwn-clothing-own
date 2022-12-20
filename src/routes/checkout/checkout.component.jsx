import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Vignette from "../../components/checkout-vignette/checkout-vignette.component";
import "./checkout.styles.scss";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  console.log({ cartItems });

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span></span>Description
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => {
        const { id } = item;
        return <Vignette key={id} product={item} />;
      })}
      <span className="total">Total: ${cartTotal} </span>
    </div>
  );
};

export default Checkout;