import axios from 'axios';
const API = process.env.REACT_APP_API;
//Produccion: https://presente-digital-api.herokuapp.com/


export const signup = async(user) => {
    console.log(user);
    return await axios.post(`${API}/api/auth/signup`, user);
}

export const signin = async(user) => {
    console.log(user);
    return await axios.post(`${API}/api/auth/signin`, user);
}