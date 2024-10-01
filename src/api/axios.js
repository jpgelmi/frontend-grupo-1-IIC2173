import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const postLogin = async (email, password) => {
  const LOGIN_URL = `${BASE_URL}/login`;

  try {
    const response = await axios.post(
      LOGIN_URL,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const postRegister = async (email, userName, password) => {
  const REGISTER_URL = `${BASE_URL}/register`;

  try {
    const response = await axios.post(
      REGISTER_URL,
      JSON.stringify({
        email: email,
        name: userName,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};


export const getFixtures = async (country, fromDate, toDate, page, count) => {
  const URL = `${BASE_URL}/fixtures`;
  const queryParams = new URLSearchParams();

  if (country) queryParams.append("country", country);
  if (fromDate) queryParams.append("from", fromDate);
  if (toDate) queryParams.append("to", toDate);
  queryParams.append("page", page.toString());
  queryParams.append("count", count.toString());

  try {
    const response = await axios.get(`${URL}?${queryParams.toString()}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};