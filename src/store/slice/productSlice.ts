import { createSlice } from '@reduxjs/toolkit'

import { capitalize } from '../../controllers/SpecialCtrl'


const taskSlice = createSlice({

  name: "product",

  initialState: {

    displayString: "",

    currentSection: "All",

    productList: [],

    loadingList: true,

    searchValue: "",

    useSearch: false,

    currentList: "",

    skip: 0,

    limit: 0,

  },

  reducers: {

    setDisplayString: (state, { payload }) => {

      const allowedValues = ['query', 'section:all', 'section:cloth', 'section:book', 'section:shoe', 'section:cosmetic']

      if (allowedValues.find(item => item === payload)) {

        state.displayString = payload

        state.currentSection = payload.split(':')[1] ? capitalize(payload.split(':')[1]) : "All"

      }

    },

    setProductList: (state, { payload }) => {

      state.productList = payload.data

      state.skip = payload.skip

      state.limit = payload.limit

      state.loadingList = false

      if (payload.searchValue) {

        state.currentList = `section: ${payload.section} || search: ${payload.searchValue}`

      } else {

        state.currentList = `section: ${payload.section}`

      }

    },

    setSearchValue: (state, { payload }) => {

      state.searchValue = payload

      state.useSearch = true

    },

    disableSearch: (state) => {

      state.searchValue = ""

      state.useSearch = false

    },

    loadingProductList: (state) => {

      state.loadingList = true

      state.productList = []

    },

  }

})

export default taskSlice.reducer;

export const { setDisplayString, setProductList, loadingProductList, setSearchValue, disableSearch } = taskSlice.actions
