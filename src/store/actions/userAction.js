import axios from 'axios';

import { returnErrors } from './errorActions';

import { USER_LOADING, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_SUCCESS, REGISTER_FAIL } from '../types';


export const fetchUsers = () => async (dispatch) => {

  const user = { name: 'Elpis' } // await axios.get('http://blahblah')

  dispatch({

    type: "FETCH_USER",

    payload: user

  })

}



export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  axios.get('/api/user', tokenConfig(getState))
    .then(res => dispatch({
      type: USER_LOADED,
      payload: res.data
    }))
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
}