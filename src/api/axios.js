import axios from "axios";
import { v4 as uuidv4 } from 'uuid';



const BASE_URL = process.env.REACT_APP_BASE_URL || "https://x1cf892wb2.execute-api.us-east-2.amazonaws.com/prod";


export default axios.create({
  baseURL: BASE_URL,
});

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
  betType,
  wallet
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
        wallet
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

export const commitTransaction = async ({accessToken, token_ws, webpay, buyRequestId}) => {
  const URL = `${BASE_URL}/buyRequest/commit`;
  console.log('Committing transaction:', {accessToken});
  console.log('Token WS:', token_ws);
  console.log('Webpay:', webpay);
  console.log('Buy Request ID:', buyRequestId);

  try {
    const response = await axios.post(
      URL,
      JSON.stringify({
        token_ws,
        webpay,
        buyRequestId
      }),
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
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
  const URL = `${BASE_URL}/wallet/isAmountAvailable`;
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

export const postDiscountAmount = async (token, amount) => {
  const URL = `${BASE_URL}/wallet/discountAmount`;
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
      `${BASE_URL}/wallet/isAmountAvailable`,
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
      `${BASE_URL}/wallet/discountAmount`,
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
      `${BASE_URL}/wallet/addAmount`,
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
    const response = await axios.get(`${BASE_URL}/wallet/balance`, {
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

export const getRecomedation = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/recomendaciones`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recomendation:', error);
    throw error;
  }
}