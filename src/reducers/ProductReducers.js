const initialState = {
    listProducts: []
}

export const productReducers = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_PRODUCT":
            return {
                ...state,
                listProducts: [...state.listProducts, action.payload]
            }
        default:
            return state
    }
}