import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:3000';

export const createBuyRequest = async (fixtureId, userId, quantity, price, betType) => {
    try {
        const requestId = uuidv4();
        const response = await fetch(`${API_URL}/buyRequest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId, fixtureId, userId, quantity, price, betType }),
        });
    
        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error buying bonds');
        }
    
        const data = await response.json();
        console.log(data);
        return requestId;
    } catch (error) {
        console.error('Error buying bonds:', error);
        return false;
    }
    };

export const checkAmountAvailable = async (userId, amount) => {
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
}

// Funcion que resta los bonos disponibles de un bono con la solicitud /restarBono
export const restarBono = async (fixtureId, quantity) => {
    try {
        const response = await fetch(`${API_URL}/bonos/restarBono`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fixtureId, quantity }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error checking amount availability');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error checking amount availability:', error);
        return false;
    }
}

export const sumarBono = async (fixtureId, quantity) => {
    try {
        const response = await fetch(`${API_URL}/bonos/sumarBono`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fixtureId, quantity }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error checking amount availability');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error checking amount availability:', error);
        return false;
    }
}

// Funcion que resta los fondos de un usuario con la solicitud /users/discountAmount
export const discountAmount = async (userId, amount) => {
    try {
        const response = await fetch(`${API_URL}/users/discountAmount`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId, amount: amount }),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error checking amount availability');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error checking amount availability:', error);
        return false;
    }
}

// Funcion que obtiene las solicitudes de compra de un usuario con la solicitud /buyRequests?userId=${userId}
export const getBuyRequestsByUser = async (userId) => {
    try {
      const response = await fetch(`${API_URL}/buyRequest/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching buy requests');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching buy requests:', error);
      return [];
    }
  };

export const getFixtureById = async (fixtureId) => {
    try {
        const response = await fetch(`${API_URL}/fixtures/${fixtureId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error fetching fixture details');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching fixture details:', error);
        return null;
    }
};

export const formatDateToUTC = (date) => {
    const pad = (num) => (num < 10 ? '0' + num : num);
  
    const year = date.getUTCFullYear();
    const month = pad(date.getUTCMonth() + 1);
    const day = pad(date.getUTCDate());
    const hours = pad(date.getUTCHours());
    const minutes = pad(date.getUTCMinutes());
    const seconds = pad(date.getUTCSeconds());
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds} UTC`;
  };

export const createBrokerRequest = async (request) => {
    console.log('Request to broker', request);
    const fixture = await getFixtureById(request.fixtureId);
    // Buscamos el equipo de la solicitud
    const teamName = request.betType === 'Home' ? fixture.teams.home.name : request.betType === 'Away' ? fixture.teams.away.name : '---';
    console.log('teamName', teamName);
    const params = {
        "request_id": request.requestId,
        "group_id": 1,
        "fixture_id": request.fixtureId,
        "league_name": fixture.league.name,
        "round": fixture.league.round,
        "date": fixture.date,
        "result": teamName,
        "deposit_token": "",
        "datetime": formatDateToUTC(new Date()),
        "quantity": request.numBonds,
        "seller": 0
    }
    sendRequestToBroker(params);
};

export const sendRequestToBroker = async (request) => {
    // Enviamos la solicitud a la ruta /buyRequest/send
    try {
        console.log('Sending request to broker', request);
        const response = await fetch(`${API_URL}/buyRequest/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error sending request to broker');
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error sending request to broker:', error);
        return false;
    }
}
