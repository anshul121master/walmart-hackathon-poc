import { api, mockApi } from "../config/apiConfig";

export const mockEnabled = false; // set true to test changes with local json else false.
const endpoints = mockEnabled ? mockApi : api;

//api's for user journey

//signin
export const login = (userCredentials) => {
  let reqObj = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userCredentials),
  };
  const url = endpoints.login();
  return fetch(url, reqObj).then(resp => resp.json());
};

export const logout = () => {
  let reqObj = {
    method: "POST",
    credentials: "same-origin",
  };
  const url = endpoints.logout();
  return fetch(url, reqObj).then(resp => resp.json());
};


export const getProfile = (email,isMember) => {
  const apiUrl = endpoints.profile();
   const requestData = {
      email: email,
      isMember: isMember
    };
  
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(requestData)
    };
  
    return fetch(apiUrl, requestOptions).then(resp => resp.json());
  
  
};

export const getOffers = (isMember) => {
  const url = endpoints.offers(isMember);
  return fetch(url).then((res) => res.json());
}

export const getOrderHistory = () => {
  const url = endpoints.orderHistory();
  return fetch(url).then((res) => res.json());
}

export const getAllProducts = () => {
  const url = endpoints.allProducts();
  return fetch(url).then((res) => res.json());
}