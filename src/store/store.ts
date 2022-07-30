import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/userSlice";

import productSlice from "./slice/productSlice";

import messagesSlice from "./slice/messagesSlice";

import displaySlice from "./slice/displaySlice";

import cartSlice from "./slice/cartSlice";


const store = configureStore({

  reducer: {

    user: userSlice,

    product: productSlice,

    messages: messagesSlice,

    display: displaySlice,

    cart: cartSlice,

  }

});


export default store;