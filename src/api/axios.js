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
export const postBuyBonds = async (
  token,
  requestId,
  fixtureId,
  userId,
  quantity,
  price,
  betType
) => {
  const URL = `${BASE_URL}/buyRequest`;
  try {
    const response = await axios.post(
      URL,
      JSON.stringify({
        requestId,
        fixtureId,
        userId,
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

export const postCheckAmountAvailable  = async (token, userId, amount) => {
  const URL = `${BASE_URL}/users/isAmountAvailable`;
  try {
    const response = await axios.post(
      URL,
      {
        id: userId,
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

export const postDiscountAmount = async (token, userId, amount) => {
  const URL = `${BASE_URL}/users/discountAmount`;
  try {
    const response = await axios.post(
      URL,
      {
        id: userId,
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

export const getBuyRequestsByUser = async (token, userId) => {
  const URL = `${BASE_URL}/buyRequest/${userId}`;
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