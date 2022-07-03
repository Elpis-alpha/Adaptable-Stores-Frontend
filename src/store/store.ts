import { configureStore } from "@reduxjs/toolkit";

import userSlice from "./slice/userSlice";

import taskSlice from "./slice/taskSlice";

import messagesSlice from "./slice/messagesSlice";

import displaySlice from "./slice/displaySlice";


const store = configureStore({

  reducer: {

    user: userSlice,

    item: taskSlice,

    messages: messagesSlice,

    display: displaySlice

  }

});


export default store;