export const getListUser = (data) => {
    console.log(data);
    return {
        type: "GET_LIST_USER",
        payload: data
    }
}

export const updateStatusUser = (data) => {
    return {
        type: "UPDATE_STATUS_USER",
        payload: data
    }
}

export const deleteUser = (id) => {
    return {
        type: "DELETE_USER",
        payload: id
    }
}

export const getUserLoginInfo = (data) => {
    return {
        type: "GET_USER_LOGIN_INFO",
        payload: data
    }
}

export const logOutUserLogin = (data) => {
    return {
        type: "LOGOUT_USER",
        payload: data
    }
}

export const getCategoryProduct = (data) => {
    return {
        type: "GET_CATEGORY_PRODUCT",
        payload: data
    }
}

export const resetProduct = (data) => {
    return {
        type: "RESET_PRODUCT",
        payload: data
    }
}

export const getListProductFromAPI = (data) => {
    return {
        type: "GET_LIST_PRODUCT",
        payload: data
    }
}