const initState = {

  available: false,

  data: {}

}


const userReducer = (state = initState, action) => {

  switch (action.type) {

    case "FETCH_USER":

      return { ...state, data: action.payload }

    default:

      return { ...state }
  }

}

export default userReducer;