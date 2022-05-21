const initState = {

  available: false,

  tested: false,

  data: {}

}


const userReducer = (state = initState, action) => {

  switch (action.type) {

    case "SET_USER":

      return { ...state, data: action.payload, available: true, tested: true }

    case "REMOVE_USER":

      return { ...state, data: {}, available: false, tested: true }

    default:

      return { ...state }
  }

}

export default userReducer;