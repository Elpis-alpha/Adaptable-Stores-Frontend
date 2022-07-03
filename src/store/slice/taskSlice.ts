import { createSlice } from '@reduxjs/toolkit'


const taskSlice = createSlice({

  name: "task",

  initialState: {

    available: false,

    data: [],

  },

  reducers: {

    setTaskData: (state, { payload }) => {

      state.data = payload

      state.available = true

    },

    appendTaskData: (state, { payload }) => {

      // @ts-ignore
      state.data.push(payload)

    },

    removeTaskData: (state) => {

      state.data = []

      state.available = false

    },

  }

})

export default taskSlice.reducer;

export const { setTaskData, appendTaskData, removeTaskData } = taskSlice.actions
