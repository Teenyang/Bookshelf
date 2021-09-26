import axios from "axios";

const URL = "https://bookshelf.goodideas-studio.com";
const bookAPI = axios.create({
  baseURL: `${URL}/api/`,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

bookAPI.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

bookAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response == null) {
      alert("伺服器無回應");
      return Promise.reject({
        data: {
          status: "error",
          detail: "伺服器無回應",
        },
      });
    }
    return Promise.reject(error.response);
  }
);

async function GET(url, params) {
  try {
    const response = await bookAPI.get(url, params);
    return response.data;
  } catch (error) {
    console.log("GET error: ", error);
    return Promise.reject(error);
  }
}

export { GET };
