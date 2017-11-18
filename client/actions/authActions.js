import axios from 'axios';
import setAuthorizationToken from '../utils/setAuthorizationToken';
//import jwtDecode from 'jwt-decode';
import jwt from 'jsonwebtoken';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    //this.context.router.history.push('/login');

    //this.props.router.push('/some/location');
  }
}

export function login(data) {
  return dispatch => {
    return axios.post('/api/auth', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      //dispatch(setCurrentUser(jwtDecode(token)));
        dispatch(setCurrentUser(jwt.decode(token)));
        //console.log(jwt.decode(token));
    });
  }
}

