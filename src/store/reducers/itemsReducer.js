const initState = {

  available: false,

  data: {

    all: [],

    display: {}

  }

}


const itemsReducer = (state = initState, action) => {

  switch (action.type) {

    case "FETCH_ITEMS":

      return { ...state, data: { ...state.data, all: action.payload} }

    case "SET_DISPLAY":

      const myItem = state.data.all.find(item => item.id === action.payload)

      return { ...state, data: { ...state.data, display: myItem} }

    default:

      return { ...state }
  }

}

export default itemsReducer;