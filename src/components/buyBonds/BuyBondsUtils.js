const API_URL = 'http://localhost:3000';

export const createBuyRequest = async (fixtureId, userId, quantity, price, betType) => {
    try {
        const response = await fetch(`${API_URL}/buyRequest`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fixtureId, userId, quantity, price, betType }),
        });
    
        if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error buying bonds');
        }
    
        const data = await response.json();
        console.log(data);
        return data;
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
