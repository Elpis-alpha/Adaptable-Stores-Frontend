import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/userSlice";

import productSlice from "./slice/productSlice";

import messagesSlice from "./slice/messagesSlice";

import displaySlice from "./slice/displaySlice";


const store = configureStore({

  reducer: {

    user: userSlice,

    product: productSlice,

    messages: messagesSlice,

    display: displaySlice

  }

});


export default store;