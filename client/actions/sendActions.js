import axios from 'axios';

export function sendRequest(userData) {
  return dispatch => {
    console.log("sending");
    return axios.post('/api/send', userData);
  }
}

