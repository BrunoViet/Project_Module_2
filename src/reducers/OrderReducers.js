const initialState = {
    listOrderDetail: []
}

export const orderReducers = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LIST_ORDER":
            return {
                ...state,
                listOrderDetail: [...state.listOrderDetail, action.payload]
            }
        case "ADD_ORDER_DETAIL":
            const newOrder = action.payload
            return {
                ...state,
                listOrderDetail: [...state.listOrderDetail, action.payload]
            }
        case "DELETE_ORDER_DETAIL":
            let listOrder = []
            listOrder = state.listOrderDetail.filter(item => item.id !== action.payload)
            return {
                ...state,
                listOrderDetail: listOrder
            }
        default:
            return state
    }
}