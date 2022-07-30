import { createSlice } from '@reduxjs/toolkit'

import { numberOfAllItemsInCart } from '../../controllers/GeneralCtrl';


const cartSlice = createSlice({

  name: "cart",

  initialState: {

    newlyAdded: 0,

    data: {},

    available: false,

    tested: false

  },

  reducers: {

    setCartData: (state, { payload }) => {

      state.newlyAdded = numberOfAllItemsInCart(payload)

      state.data = payload

      state.tested = true

      state.available = true

    },

    setCartTest: (state, { payload }) => {

      state.tested = payload

    },

    removeCartData: (state) => {

      state.data = {}

      state.available = false

      state.tested = true

      state.newlyAdded = 0

    },

  }

})

export default cartSlice.reducer;

export const { removeCartData, setCartData, setCartTest } = cartSlice.actions
