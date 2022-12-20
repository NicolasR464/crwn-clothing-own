import "./checkout-vignette.styles.scss";

import { useContext } from "react";

import { CartContext } from "../../contexts/cart.context";

const Vignette = ({ product }) => {
  console.log("vignette:", product);
  const {
    addQuantityToProduct,
    removeQuantityToProduct,
    addItemToCart,
    removeItemToCart,
    totalRemove,
  } = useContext(CartContext);
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
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name}></img>
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>

        <div className="arrow" onClick={addHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>

      <span onClick={totalRemoveHandler}>&#10005;</span>
    </div>
  );
};

export default Vignette;

{
  /* <span onClick={addHandler}>&gt;</span> */
}
