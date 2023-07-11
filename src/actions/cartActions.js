export const addProductToCart = (data) => {
    return {
        type: "ADD_PRODUCT",
        payload: data
    }
}

export const deleteProduct = (id) => {
    return {
        type: "DELETE_PRODUCT",
        payload: id
    }
}

export const resetCart = () => {
    return {
        type: "RESET_CART",
    }
}