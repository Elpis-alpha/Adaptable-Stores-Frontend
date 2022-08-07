import { createSlice } from '@reduxjs/toolkit'


const checkoutSlice = createSlice({

  name: "checkout",

  initialState: {

    data: {},

    available: false,

  },

  reducers: {

    setCheckoutData: (state, { payload }) => {

      state.data = payload

      state.available = true

    },

    removeCheckoutData: (state) => {

      state.data = {}

      state.available = false

    },

  }

})

export default checkoutSlice.reducer;

export const { removeCheckoutData, setCheckoutData } = checkoutSlice.actions
