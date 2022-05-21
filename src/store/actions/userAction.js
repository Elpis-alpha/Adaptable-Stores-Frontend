import axios from 'axios';


export const fetchUsers = () => async (dispatch) => {

  const user = { name: 'Elpis' } // await axios.get('http://blahblah')

  dispatch({

    type: "FETCH_USER",

    payload: user

  })

}