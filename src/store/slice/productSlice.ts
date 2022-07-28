import { createSlice } from '@reduxjs/toolkit'


const taskSlice = createSlice({

  name: "product",

  initialState: {

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

  }

})

export default taskSlice.reducer;

export const { loadingMultiProductList, setMultiProductList } = taskSlice.actions
