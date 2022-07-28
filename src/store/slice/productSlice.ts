import { createSlice } from '@reduxjs/toolkit'

import { capitalize, getQueryObject } from '../../controllers/SpecialCtrl'


const taskSlice = createSlice({

  name: "product",

  initialState: {

    displayString: "",

    currentSection: "All",

    productList: [],

    loadingList: true,

    currentList: "",

    skip: 0,

    limit: 0,

  },

  reducers: {

    setDisplayString: (state, { payload: view }) => {

      const allowedValues = ['query', 'section:all', 'section:cloth', 'section:book', 'section:shoe', 'section:cosmetic']

      if (allowedValues.find(item => item === view)) {

        state.displayString = view

        state.currentSection = view.split(':')[1] ? capitalize(view.split(':')[1]) : "All"

      }

    },

    setProductList: (state, { payload }) => {

      state.productList = payload.data

      state.skip = payload.skip

      state.limit = payload.limit

      state.loadingList = false

      if (payload.search) {

        state.currentList = `section: ${payload.section} || search: ${payload.search}`

      } else {

        state.currentList = `section: ${payload.section}`

      }

    },

    loadingProductList: (state) => {

      state.loadingList = true

      state.productList = []

    },

  }

})

export default taskSlice.reducer;

export const { setDisplayString, setProductList, loadingProductList } = taskSlice.actions
