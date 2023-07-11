export const getListUser = (data) => {
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