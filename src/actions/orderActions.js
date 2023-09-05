export const getListOrder = (data) => {
    return {
        type: "GET_LIST_ORDER",
        payload: data
    }
}

export const addOrderDetail = (data) => {
    return {
        type: "ADD_ORDER_DETAIL",
        payload: data
    }
}

export const deleteOrderDetail = (id) => {
    return {
        type: "DELETE_ORDER_DETAIL",
        payload: id
    }
}