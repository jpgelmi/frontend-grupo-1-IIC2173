const API_URL = 'http://localhost:3000'; // Reemplaza con la URL de tu backend

export const getBono = async (fixtureId) => {
  try {
    // console.log("Buscando bonos");
    const response = await fetch(`${API_URL}/bonos/bonos/${fixtureId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al obtener el bono');
    }

    const bono = await response.json();
    // console.log("Bono recibido");
    // console.log(bono);
    return bono;
  } catch (error) {
    console.error('Error al obtener el bono:', error);
    throw error;
  }
};