import axios from "axios";
import { v4 as uuidv4 } from 'uuid';



const BASE_URL = process.env.REACT_APP_BASE_URL || "https://x1cf892wb2.execute-api.us-east-2.amazonaws.com/prod";


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
  console.log('postLogin', LOGIN_URL)

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
  console.log('register post', REGISTER_URL)

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

export const getFixtures = async (token, country, fromDate, toDate, page, count) => {
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
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const postBuyBonds = async (
  token,
  fixtureId,
  quantity,
  price,
  betType
) => {
  const URL = `${BASE_URL}/buyRequest`;
  try {
    const requestId = uuidv4();
    const response = await axios.post(
      URL,
      JSON.stringify({
        requestId,
        fixtureId,
        quantity,
        price,
        betType,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const postCheckAmountAvailable  = async (token, amount) => {
  const URL = `${BASE_URL}/user/isAmountAvailable`;
  try {
    const response = await axios.post(
      URL,
      {
        amount,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data.isAvailable;
  } catch (error) {
    console.error("Error checking amount availability:", error);
    return false;
  }
};

export const postRestarBono = async (token, fixtureId, quantity) => {
  const URL = `${BASE_URL}/bonos/restarBono`;
  try {
    const response = await axios.post(
      URL,
      {
        fixtureId,
        quantity,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al restar el bono:', error);
    return false;
  }
};

export const postSumarBono = async (token, fixtureId, quantity) => {
  const URL = `${BASE_URL}/bonos/sumarBono`;
  try {
    const response = await axios.post(
      URL,
      {
        fixtureId,
        quantity,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al sumar el bono:', error);
    return false;
  }
};

export const postDiscountAmount = async (token, amount) => {
  const URL = `${BASE_URL}/user/discountAmount`;
  try {
    const response = await axios.post(
      URL,
      {
        amount: amount,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al descontar la cantidad:', error);
    return false;
  }
};

export const getBuyRequestsByUser = async (token) => {
  const URL = `${BASE_URL}/buyRequest`;
  console.log('URL:', URL); 
  console.log('Token:', token); 
  try {
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener las solicitudes de compra:', error);
    return [];
  }
};

export const getFixtureById = async (token, fixtureId) => {
  const URL = `${BASE_URL}/fixtures/${fixtureId}`;
  try {
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los detalles del fixture:', error);
    return null;
  }
};

export const postSendRequestToBroker = async (token, request) => {
  // Enviamos la solicitud a la ruta /buyRequest/send
  const URL = `${BASE_URL}/buyRequest/send`;
  try {
    console.log('Sending request to broker', request);
    const response = await axios.post(
      URL,
      request,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error sending request to broker:', error);
    return false;
  }
};

export const getBono = async (token, fixtureId) => {
  try {
    const URL = `${BASE_URL}/bonos/${fixtureId}`;
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error('Error al obtener el bono:', error);
    throw error;
  }
};

export const getBonoByFixtureId = async (token, fixtureId) => {
  try {
    const URL = `${BASE_URL}/bonos/${fixtureId}`;
    console.log(`${BASE_URL}/bonos/${fixtureId}`)
    const response = await axios.get(URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log(response)
    return response;

  } catch (error) {
    console.error('Error al obtener el bono:', error);
  }
};

export const postIsAmountAvailable = async (token, userId, amount) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/isAmountAvailable`,
      { id: userId, amount },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data.isAvailable;
  } catch (error) {
    console.error('Error checking amount availability:', error);
    throw error;
  }
};

export const postDeductAmount = async (token, userId, amount) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/discountAmount`,
      { id: userId, amount },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data.money;
  } catch (error) {
    console.error('Error deducting amount:', error);
    throw error;
  }
};

export const postAddAmount = async (token, amount) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/user/addAmount`,
      JSON.stringify({ amount: parseFloat(amount) }),
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data.money;
  } catch (error) {
    console.error('Error adding amount:', error);
    throw error;
  }
};

export const getBalance = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/balance`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data.balance;
  } catch (error) {
    console.error('Error fetching balance:', error);
    throw error;
  }
};

export const getUserName = async (token, userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/userName/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data.userName;
  } catch (error) {
    console.error('Error fetching username:', error);
    throw error;
  }
};