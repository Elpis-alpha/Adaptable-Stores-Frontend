import axios from 'axios';


export const fetchItems = () => async (dispatch) => {

  const items = await axios('/api/dummy/users')

  dispatch({

    type: "FETCH_ITEMS",

    payload: items.data

  })

}


export const setDisplay = (id) => async (dispatch) => {

  dispatch({

    type: "SET_DISPLAY",

    payload: id

  })

}