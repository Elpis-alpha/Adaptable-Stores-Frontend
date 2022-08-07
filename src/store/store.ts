import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/userSlice";

import productSlice from "./slice/productSlice";

import messagesSlice from "./slice/messagesSlice";

import displaySlice from "./slice/displaySlice";

import cartSlice from "./slice/cartSlice";

import querySlice from "./slice/querySlice";

import checkoutSlice from "./slice/checkoutSlice";


const store = configureStore({

  reducer: {

    user: userSlice,

    product: productSlice,

    messages: messagesSlice,

    display: displaySlice,

    cart: cartSlice,

    query: querySlice,

    checkout: checkoutSlice

  }

});


export default store;