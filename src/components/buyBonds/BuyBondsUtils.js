const API_URL = 'http://localhost:3000';

export const createBuyRequest = async (fixtureId, userId, quantity, price, betType) => {
    try {
        console.log('createBuyRequest');
        console.log('fixtureId', fixtureId);
        console.log('userId', userId);
        console.log('quantity', quantity);
        console.log('price', price);
        console.log('betType', betType);
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
