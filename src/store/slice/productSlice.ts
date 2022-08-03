import { createSlice } from '@reduxjs/toolkit'


const productSlice = createSlice({

  name: "product",

  initialState: {

    singleProductDimensions: {

      transformOrigin: "50vh 50vh"

    },

    singleProduct: {

      available: false,

      loading: false,

      queryData: {},

      data: {}

    },

    multiProduct: {

      available: false,

      loading: false,

      queryData: {},

      data: []

    },

  },

  reducers: {

    loadingMultiProductList: (state, { payload }) => {

      state.multiProduct.loading = payload

    },

    setMultiProductList: (state, { payload }) => {

      state.multiProduct = payload

    },

    setSingleProductDimensions: (state, { payload }) => {

      state.singleProductDimensions.transformOrigin = `${payload.left + (payload.width / 2)}px ${payload.top + (payload.height / 2)}px`

    },

    loadingSingleProduct: (state, { payload }) => {

      state.singleProduct.loading = payload

    },

    setSingleProduct: (state, { payload }) => {

      state.singleProduct = payload

    },

  }

})

export default productSlice.reducer;

export const { loadingMultiProductList, setMultiProductList, setSingleProduct, setSingleProductDimensions, loadingSingleProduct } = productSlice.actions
