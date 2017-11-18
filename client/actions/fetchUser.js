import axios from 'axios';

export function fetchUser(userData) {
    return dispatch => {
        return axios.post('/api/userlist', userData);
    }
}