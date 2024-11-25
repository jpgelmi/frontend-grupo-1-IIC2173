import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL || "https://arquisisproject.me";

const applyDiscount = async (token, fixture, bono, discount) => {
    // Llamamos al endpoint de la ruta /bonos con el método put
    try {
        console.log('Tratando de aplicar descuento de', discount);
        if (discount != -1) {
            bono.precio = bono.precio * (1 - discount/100);
        } else {
            bono.precio = 1000;
        }
        const response = await axios.put(
          `${BASE_URL}/bonos/addDiscount`,
          JSON.stringify({ 
            fixtureId: fixture.fixtureId,
            bonoData: bono,
           }),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        console.log('Response:', response);
        return response.data;
      } catch (error) {
        console.error('Error adding amount:', error);
        throw error;
      }
}
  

export default applyDiscount;
