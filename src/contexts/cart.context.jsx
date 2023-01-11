import { createContext, useEffect, useState, useReducer } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  totalRemove: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const addCardItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : { ...cartItem }
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  //find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  //check if quantity if equal to one, if it is remove that item from cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }
  //return back items with matching cart entity with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : { ...cartItem }
  );
};

const addQuantity = (cartItems, product) => {
  return cartItems.map((cartItem) =>
    cartItem.id === product.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : { ...cartItem }
  );
};

const removeQuantity = (cartItems, product) => {
  return cartItems.map((cartItem) =>
    cartItem.id === product.id
      ? { cartItem, quantity: cartItem.quantity - 1 }
      : { ...cartItem }
  );
};

const removeItemComplete = (cartItems, product) => {
  return cartItems.filter((cartItem) => cartItem.id !== product.id);
};

// REDUCER METHODS
export const CART_ACTION_TYPES = {
  SET_CURRENT_COUNT: "SET_CURRENT_COUNT",
  SET_CURRENT_TOTAL: "SET_CURRENT_TOTAL",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  console.log("dispatched 🚀");
  console.log({ action });
  const { type, payload } = action;

  switch (type) {
    case "SET_CART_ITEMS":
      return { ...state, ...payload };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

//

export const CartProvider = ({ children }) => {
  const [{ cartCount, cartItems, isCartOpen, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    dispatch({
      type: "SET_CART_ITEMS",
      payload: {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      },
    });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCardItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const addQuantityToProduct = (product) => {
    const newCartItems = addQuantity(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const removeQuantityToProduct = (product) => {
    const newCartItems = removeQuantity(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const totalRemove = (product) => {
    const newCartItems = removeItemComplete(cartItems, product);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    cartItems,
    cartCount,
    addQuantityToProduct,
    removeQuantityToProduct,
    totalRemove,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
