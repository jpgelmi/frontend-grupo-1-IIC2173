import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

export default axios.create({
  baseURL: BASE_URL,
});

export const getFixtures = async (country, fromDate, toDate, page, count) => {
    const URL = `${BASE_URL}/fixtures`;
    const queryParams = new URLSearchParams();
  
    if (country) queryParams.append('country', country);
    if (fromDate) queryParams.append('from', fromDate);
    if (toDate) queryParams.append('to', toDate);
    queryParams.append('page', page.toString());
    queryParams.append('count', count.toString());
  
    try {
      const response = await axios.get(`${URL}?${queryParams.toString()}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response;
    } catch (error) {
      return error;
    }
  };
