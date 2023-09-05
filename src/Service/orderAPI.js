import axios from "axios"

const API_URL = 'http://localhost:3131';

export const getListOrders = async () => {
    try {
        const response = await axios.get(`${API_URL}/order`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getTotalPriceOrder = async () => {
    try {
        const response = await axios.get(`${API_URL}/order_total`);
        return response.data
    } catch (error) {
        throw error
    }
}

export const getDetailOrders = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/order/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getDetailOrdersById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/order_id/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addOrder = async (order) => {
    try {
        const response = await axios.post(`${API_URL}/order`, order);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateOrder = async (orderUpdated) => {
    try {
        const response = await axios.put(`${API_URL}/order`, orderUpdated);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/order/${id}`,);
        return response.data;
    } catch (error) {
        throw error;
    }
};