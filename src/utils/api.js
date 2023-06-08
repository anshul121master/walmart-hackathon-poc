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


export const getProfile = () => {
  const url = endpoints.profile();
  return fetch(url).then((resp) => {
    if (resp.ok) {
      return resp.json().then(({ response }) => ({
        status: resp.status,
        response
      }))
    }
    else {
      return resp.json().then(({ exception }) => ({
        status: resp.status,
        exception
      }))
    }
  });
};

export const getOrderHistory = () => {
  const url = endpoints.orderHistory();
  return fetch(url).then((res) => res.json());
}

export const getAllProducts = () => {
  const url = endpoints.allProducts();
  return fetch(url).then((res) => res.json());
}