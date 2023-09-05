import axios from "axios"

const API_URL = 'http://localhost:3131';

export const getListProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/product`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getCategory = async () => {
    try {
        const response = await axios.get(`${API_URL}/category`)
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getProductByCategory = async (category) => {
    try {
        const response = await axios.get(`${API_URL}/category/${category}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getDetailProducts = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/product/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getListProductsSortedByName = async (sortType) => {
    try {
        const response = await axios.get(`${API_URL}/product?sortProductName=${sortType}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getListProductsSortedByRole = async (sortType) => {
    try {
        const response = await axios.get(`${API_URL}/product?sortRole=${sortType}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getListProductsSortedByLastName = async (sortType) => {
    try {
        const response = await axios.get(`${API_URL}/product?sortLastName=${sortType}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const addProduct = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/product`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateProduct = async (formData) => {
    try {
        const response = await axios.put(`${API_URL}/product`, formData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/product/${id}`,);
        return response.data;
    } catch (error) {
        throw error;
    }
};
