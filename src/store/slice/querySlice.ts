import { createSlice } from '@reduxjs/toolkit'

const querySlice = createSlice({

  name: "query",

  initialState: {

    queryObject: {}

  },

  reducers: {

    setQueryObject: (state, { payload }) => {

      state.queryObject = payload

    },
  },

})

export default querySlice.reducer;

export const { setQueryObject } = querySlice.actions
