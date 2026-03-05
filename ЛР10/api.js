const API_BASE_URL = 'https://edu.std-900.ist.mospolytech.ru/labs/api';
const API_KEY = '04072521-1852-4483-a595-b4bffdb98067'; 

async function fetchDishesFromAPI() {
    try {
        const url = `${API_BASE_URL}/dishes?api_key=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка загрузки блюд из API:', error);
        return null;
    }
}

async function submitOrderToAPI(orderData) {
    try {
        const url = `${API_BASE_URL}/orders?api_key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { success: true, data };
        
    } catch (error) {
        console.error('Ошибка отправки заказа:', error);
        return { success: false, error: error.message };
    }
}

async function fetchOrderFromAPI(orderId) {
    try {
        const url = `${API_BASE_URL}/orders/${orderId}?api_key=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка загрузки заказа:', error);
        return null;
    }
}

async function fetchAllOrdersFromAPI() {
    try {
        const url = `${API_BASE_URL}/orders?api_key=${API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка загрузки заказов:', error);
        return { error: error.message };
    }
}

async function updateOrderInAPI(orderId, orderData) {
    try {
        const url = `${API_BASE_URL}/orders/${orderId}?api_key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { success: true, data };
        
    } catch (error) {
        console.error('Ошибка обновления заказа:', error);
        return { success: false, error: error.message };
    }
}

async function deleteOrderFromAPI(orderId) {
    try {
        const url = `${API_BASE_URL}/orders/${orderId}?api_key=${API_KEY}`;
        
        const response = await fetch(url, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return { success: true, data };
        
    } catch (error) {
        console.error('Ошибка удаления заказа:', error);
        return { success: false, error: error.message };
    }
}