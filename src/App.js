import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Navigation from "./components/navigation/navigation.component";

import "./App.css";

import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import Checkout from "./routes/checkout/checkout.component";

import { setCurrentUser } from "./store/user/user.action";

import Shop from "./routes/shop/shop.component";

import {
  onAuthStateChangedListener,
  createDocFromAuth,
} from "./utils/firebase/firebase.utils";

const App = () => {
  const dispatch = useDispatch();

  //USERS
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createDocFromAuth(user);
      // console.log({ user });
      dispatch(setCurrentUser(user));
    });

    return unsubscribe; //whenever you unmount
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
