const initialState = {
    listProducts: []
}

export const cartReducers = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            for (let i = 0; i < state.listProducts.length; i++) {
                if (state.listProducts[i].id == action.payload.id) {
                    state.listProducts[i].quantity += 1
                    return {
                        ...state,
                        listProducts: [...state.listProducts]
                    }
                }
            }
            return {
                ...state,
                listProducts: [...state.listProducts, action.payload]
            }
        case "DELETE_PRODUCT":
            const newListProducts = state.listProducts.filter(item => item.id !== action.payload)
            return {
                ...state,
                listProducts: newListProducts
            }
        default:
            return state
    }
}