import axios from "axios";

<<<<<<< HEAD
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL
=======
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
>>>>>>> a23a4b39b56a6301878c4c9a50cfff455a84f1a8

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    authorization : "Bearer " + sessionStorage.getItem('token')
  },
});

/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    error = error.response.data;
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;
