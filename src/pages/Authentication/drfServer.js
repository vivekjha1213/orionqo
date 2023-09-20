import axios from 'axios';
export const MAINURL = "http://194.163.40.231:8080/";

// API for login
export const drfLogin = async (body) => {
    return await axios.post(`${MAINURL}Hospital/login/`, body);
}