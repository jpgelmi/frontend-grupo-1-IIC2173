const API_URL = 'http://localhost:3000'; // Reemplaza con la URL de tu backend

export const isAmountAvailable = async (userId, amount) => {
  try {
    const response = await fetch(`${API_URL}/users/isAmountAvailable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId, amount }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error checking amount availability');
    }

    const data = await response.json();
    return data.isAvailable;
  } catch (error) {
    console.error('Error checking amount availability:', error);
    return false;
  }
};

export const deductAmount = async (userId, amount, setBalance) => {
  try {
    const response = await fetch(`${API_URL}/users/discountAmount`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId, amount }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error deducting amount');
    }

    const user = await response.json();
    setBalance(user.money);
    return true;
  } catch (error) {
    console.error('Error deducting amount:', error);
    return false;
  }
};

export const addAmount = async (userId, amount, setBalance) => {
  try {
    // console.log(userId);
    // console.log(amount);
    const response = await fetch(`${API_URL}/users/addAmount/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: userId, amount: parseFloat(amount) }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error adding amount');
    }

    const user = await response.json();
    setBalance(user.money);
    return true;
  } catch (error) {
    console.error('Error adding amount:', error);
    return false;
  }
};

export const getBalance = async (userId, setBalance, setUserName) => {
    try {
        // console.log(userId);
        const response = await fetch(`${API_URL}/balance/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching balance');
      }
  
      const data = await response.json(); // Convertir el cuerpo de la respuesta en un objeto JavaScript
      setBalance(data.balance); // Acceder al balance del usuario
    } catch (error) {
      console.error('Error fetching balance:', error);
    }

    // Obtener el nombre de usuario
    const usernameResponse = await fetch(`${API_URL}/userName/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (usernameResponse.ok) {
        const data = await usernameResponse.json();
        // console.log(data.userName);
        setUserName(data.userName);
      } else {
        console.error('Error fetching username');
      }
  };
