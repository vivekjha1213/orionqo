import axios from "axios";
export const MAINURL = "http://194.163.40.231:8080/";

//  API for login...
export const drfLogin = async (body) => {
  return await axios.post(`${MAINURL}Hospital/login/`, body);
};

//  for reset password...

export const drfForgetPassword = async (body) => {
    return await axios.post(`${MAINURL}/Hospital/send-reset-password-email/`, body);
  };



export const drfLogout = async (body) => {
    return await axios.post(`${MAINURL}/Hospital/logout/`, body);
  };


export const drfRegister = async (body) => {
  return await axios.post(`${MAINURL}Hospital/add/`, body);
};



export const drfGet = async (body) => {
  return await axios.get(`${MAINURL}Hospital/list/`, body);
};
export const drfUpdate = async (body) => {
  return await axios.put(`${MAINURL}Hospital/update/`, body);
};

export const drfDelete = async (id) => {
        const response = await axios.delete(`${MAINURL}Hospital/delete/${id}`);
       
};



// for auth...